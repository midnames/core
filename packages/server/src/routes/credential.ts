import type { IncomingMessage, ServerResponse } from "node:http";
import { logger } from "../logger.js";
import {
  OfferRequestSchema,
  AcknowledgeRequestSchema,
  IssueFromSessionSchema,
} from "../entities/validator.js";
import { verifyAndroidAttestation } from "../attestation.js";
import { verifyIdToken } from "../auth/verifyIdToken.js";
import { parseUncompressedKey } from "../crypto.js";
import * as MidnamesServerConstants from "../constants.js";
import * as MidnamesDid from "../deploy.js";
import { issueCredential } from "../handlers/issueCredential.js";
import * as MidnamesHttp from "../utils/http.js";
import * as MidnamesStore from "../stores/index.js";

import { IssuerClient, InMemorySessionStore } from "@midnames/sdk";

import type { CredentialRouteContext } from "./types.js";

const issuerClient = new IssuerClient();

export function createCredentialRoutes<TSubject>(ctx: CredentialRouteContext<TSubject>) {
  const sessionStore = new InMemorySessionStore<TSubject>();
  return {
    "/offer": { handler: handleOffer(ctx, sessionStore), auth: true },
    "/ack": { handler: handleAcknowledge(ctx, sessionStore), auth: false },
    "/issue": { handler: handleIssue(ctx, sessionStore), auth: false },
    _sessionStore: sessionStore,
  };
}

export function getHandleClaim<TSubject>(ctx: CredentialRouteContext<TSubject>, sessionStore: InMemorySessionStore<TSubject>) {
  return async (req: IncomingMessage, res: ServerResponse, nonce: string) => {
    try {
      const session = sessionStore.get(nonce);
      if (!session) {
        MidnamesHttp.json(res, 410, { error: "Offer not found or expired" });
        return;
      }
      if (session.state !== "pending") {
        MidnamesHttp.json(res, 410, { error: "Offer already claimed" });
        return;
      }
      const meta = MidnamesStore.offerMetadata.get(nonce);
      MidnamesHttp.json(res, 200, {
        credential_issuer: session.issuerDid,
        credential_types: session.credentialTypes,
        pre_authorized_code: session.id,
        ttl: Math.max(0, Math.floor((session.expiresAt - Date.now()) / 1000)),
        authRequired: !!meta?.userEmail,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      logger.error(`Claim fetch failed: ${message}`);
      MidnamesHttp.json(res, 500, { error: "Failed to fetch offer" });
    }
  };
}

function handleOffer<TSubject>(ctx: CredentialRouteContext<TSubject>, sessionStore: InMemorySessionStore<TSubject>) {
  return async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
    try {
      const body = await MidnamesHttp.readBody(req);
      const parsed = MidnamesHttp.validateBody(res, OfferRequestSchema, JSON.parse(body));
      if (!parsed) return;

      const {
        issuerDid, issuerSeed, issuerName, issuerLogoUrl,
        userEmail, userId, dashboardCallbackUrl, credential, expiresIn,
      } = parsed;

      let subjectData: TSubject;
      try {
        subjectData = ctx.validateSubject(credential);
      } catch (e) {
        MidnamesHttp.json(res, 400, { error: `Invalid credential subject: ${e instanceof Error ? e.message : e}` });
        return;
      }

      const offer = issuerClient.createOffer<TSubject>(
        issuerDid,
        {
          credentialTypes: ctx.credentialType,
          subjectData,
          expiresIn: expiresIn ?? 300,
          credentialEndpoint: `${MidnamesServerConstants.BASE_URL}/issue`,
        },
        sessionStore,
      );

      const sessionId = offer.grants["urn:ietf:params:oauth:grant-type:pre-authorized_code"]["pre-authorized_code"];

      MidnamesStore.offerMetadata.set(sessionId, {
        issuerDid, issuerSeed, issuerName, issuerLogoUrl,
        userEmail, userId, dashboardCallbackUrl, credentialData: credential,
      });

      const claimUrl = `${MidnamesServerConstants.BASE_URL}/claim/${sessionId}`;
      logger.info(`Offer created: ${sessionId}`);
      MidnamesHttp.json(res, 200, { offer, claimUrl });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      logger.error(`Offer failed: ${message}`);
      MidnamesHttp.json(res, 500, { error: "Failed to create offer" });
    }
  };
}

function handleAcknowledge<TSubject>(ctx: CredentialRouteContext<TSubject>, sessionStore: InMemorySessionStore<TSubject>) {
  return async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
    try {
      const body = await MidnamesHttp.readBody(req);
      const parsed = MidnamesHttp.validateBody(res, AcknowledgeRequestSchema, JSON.parse(body));
      if (!parsed) return;

      const {
        preAuthorizedCode, holderCommitment, holderPublicKey,
        cdcvmPublicKey, cdcvmAttestationChain, idToken, idTokenProvider,
      } = parsed;

      const ackMeta = MidnamesStore.offerMetadata.get(preAuthorizedCode);
      if (ackMeta?.userEmail) {
        if (!idToken || !idTokenProvider) {
          MidnamesHttp.json(res, 401, { error: "This credential requires authentication", code: "AUTH_REQUIRED" });
          return;
        }
        try {
          const identity = await verifyIdToken(
            idToken, idTokenProvider,
            MidnamesServerConstants.GOOGLE_CLIENT_ID,
            MidnamesServerConstants.APPLE_BUNDLE_ID,
          );
          if (identity.email.toLowerCase() !== ackMeta.userEmail.toLowerCase()) {
            MidnamesHttp.json(res, 403, { error: "This credential was issued for a different email address", code: "EMAIL_MISMATCH" });
            return;
          }
        } catch {
          MidnamesHttp.json(res, 401, { error: "Invalid authentication token", code: "TOKEN_INVALID" });
          return;
        }
      }

      const holderKeyXY = parseUncompressedKey(holderPublicKey);

      let cdcvmKeyXY: { x: string; y: string } | undefined;
      if (cdcvmPublicKey && cdcvmAttestationChain) {
        const attestResult = verifyAndroidAttestation(cdcvmAttestationChain, holderCommitment);
        if (!attestResult.valid) {
          MidnamesHttp.json(res, 400, { error: `CDCVM attestation failed: ${attestResult.error}` });
          return;
        }
        if (attestResult.publicKey?.toLowerCase() !== cdcvmPublicKey.toLowerCase()) {
          MidnamesHttp.json(res, 400, { error: "CDCVM public key does not match attested key" });
          return;
        }
        cdcvmKeyXY = parseUncompressedKey(cdcvmPublicKey);
      }

      await ctx.waitForSync();
      const holderDeployed = await MidnamesDid.deployDIDcontract(
        ctx.providers,
        ctx.privateState,
        holderKeyXY,
        ctx.zkConfigPath,
        cdcvmKeyXY,
      );
      const holderDid = `did:midnight:${ctx.networkId}:${holderDeployed.address}`;

      if (cdcvmKeyXY && cdcvmAttestationChain) {
        MidnamesStore.cdcvmAttestationStore.set(holderDid, cdcvmAttestationChain);
      }

      const result = issuerClient.acknowledgeResponse<TSubject>(
        { preAuthorizedCode, holderCommitment, holderDid },
        sessionStore,
      );

      if (!result.accepted) { MidnamesHttp.json(res, 400, result); return; }

      const meta = MidnamesStore.offerMetadata.get(preAuthorizedCode);
      if (meta) {
        (meta as any).holderPublicKey = holderPublicKey;
        (meta as any).holderDid = holderDid;
        if (cdcvmPublicKey) (meta as any).cdcvmPublicKey = cdcvmPublicKey;
      }

      MidnamesHttp.json(res, 200, { ...result, holderDid, cdcvmRegistered: !!cdcvmKeyXY });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      logger.error(`Acknowledge failed: ${message}`);
      MidnamesHttp.json(res, 500, { error: "Acknowledgment failed" });
    }
  };
}

function handleIssue<TSubject>(ctx: CredentialRouteContext<TSubject>, sessionStore: InMemorySessionStore<TSubject>) {
  return async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
    try {
      const body = await MidnamesHttp.readBody(req);
      const parsed = MidnamesHttp.validateBody(res, IssueFromSessionSchema, JSON.parse(body));
      if (!parsed) return;

      const { sessionId, holderCommitment } = parsed;

      const validation = issuerClient.validateAndConsumeSession<TSubject>(
        { sessionId, holderCommitment },
        sessionStore,
      );

      if (!validation.success) {
        MidnamesHttp.json(res, 400, { error: validation.error, errorCode: validation.errorCode });
        return;
      }

      const session = validation.session;
      const meta = MidnamesStore.offerMetadata.get(sessionId);

      if (!session.subjectData || !meta) {
        MidnamesHttp.json(res, 400, { error: "Session data incomplete" });
        return;
      }

      const holderDid = session.holderDid!;
      const credentialSubject = ctx.buildCredential(session.subjectData, holderDid, meta.issuerDid) as Record<string, unknown> & { id: string };

      const vc = await issueCredential(
        meta.issuerDid,
        credentialSubject,
        ctx.credentialType,
        {
          seed: meta.issuerSeed,
          issuerName: meta.issuerName,
          issuerLogoUrl: meta.issuerLogoUrl,
        },
      );

      issuerClient.markIssuedCredentialId(sessionId, vc.id!, sessionStore);

      if (ctx.onIssued) {
        try {
          await ctx.onIssued(vc as any);
        } catch (hookErr) {
          logger.warn(`onIssued hook failed: ${hookErr}`);
        }
      }

      const callbackUrl = meta.dashboardCallbackUrl || `${MidnamesServerConstants.DASHBOARD_API_URL}/api/credentials`;
      if (meta.userId) {
        fetch(callbackUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ credentialId: vc.id, userId: meta.userId, issuerDid: meta.issuerDid }),
        }).catch((err) => logger.warn(`Dashboard callback failed: ${err.message}`));
      }

      MidnamesStore.offerMetadata.delete(sessionId);
      logger.info(`Credential issued: ${vc.id}`);
      MidnamesHttp.json(res, 200, { verifiableCredential: vc });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      logger.error(`Issue failed: ${message}`);
      MidnamesHttp.json(res, 500, { error: "Credential issuance failed" });
    }
  };
}
