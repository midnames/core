import type { IncomingMessage, ServerResponse } from "node:http";
import { canonicalize } from "json-canonicalize";
import { logger } from "../logger.js";
import { buildUncompressedPubKey, verifyP256 } from "../crypto.js";
import * as MidnamesServerConstants from "../constants.js";
import * as MidnamesHttp from "../utils/http.js";
import * as MidnamesStore from "../stores/index.js";
import * as DID from "../managed/did/contract/index.js";
import { ledger as revocationLedger } from "../managed/revocation-list/contract/index.js";
import { hashCredentialId } from "../utils/credentialId.js";
import { BatchVerifySchema, VerifyPresentationSchema, validateCredentialStructure } from "../entities/validator.js";
import type { MidnightDIDProviders, SignatureVerificationResult } from "../types.js";
import type { VerificationRouteContext } from "./types.js";

export function createVerificationRoutes(ctx: VerificationRouteContext) {
  return {
    "/verify": { handler: handleVerify(ctx), auth: false },
    "/verify-batch": { handler: handleVerifyBatch(ctx), auth: false },
    "/challenge": { handler: handleChallenge, auth: false },
    "/verify-presentation": { handler: handleVerifyPresentation(ctx), auth: false },
  };
}

function handleVerify(ctx: VerificationRouteContext) {
  return async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
    try {
      const vc = JSON.parse(await MidnamesHttp.readBody(req));
      if (!vc.type || !Array.isArray(vc.type) || !vc.type.includes("VerifiableCredential")) {
        MidnamesHttp.json(res, 400, { error: "Invalid credential: missing VerifiableCredential type" });
        return;
      }
      if (!vc.proof) {
        MidnamesHttp.json(res, 400, { error: "Invalid credential: missing proof" });
        return;
      }
      if (await isRevoked(ctx.providers, ctx.revocationAddress, vc.id)) {
        MidnamesHttp.json(res, 200, { verified: false, status: "revoked", error: "Credential has been revoked" });
        return;
      }
      const result = await verifyCredentialSignature(ctx.providers, vc);
      MidnamesHttp.json(res, 200, { verified: result.valid, status: result.valid ? "verified" : "invalid", error: result.error });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      logger.error(`Verify failed: ${message}`);
      MidnamesHttp.json(res, 400, { error: message });
    }
  };
}

function handleVerifyBatch(ctx: VerificationRouteContext) {
  return async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
    try {
      const parsed = MidnamesHttp.validateBody(res, BatchVerifySchema, JSON.parse(await MidnamesHttp.readBody(req)));
      if (!parsed) return;

      const results = await Promise.all(
        parsed.credentials.map(async (vc) => {
          const base = { id: vc.id, type: vc.type, credentialSubject: vc.credentialSubject };
          if (await isRevoked(ctx.providers, ctx.revocationAddress, vc.id)) {
            return { ...base, status: "revoked" as const, error: "Credential has been revoked" };
          }
          const result = await verifyCredentialSignature(ctx.providers, vc as any);
          if (result.valid) return { ...base, status: "verified" as const };
          return { ...base, status: "invalid" as const, error: result.error };
        }),
      );

      MidnamesHttp.json(res, 200, {
        valid: results.filter((r) => r.status === "verified"),
        invalid: results.filter((r) => r.status !== "verified"),
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      logger.error(`Batch verify failed: ${message}`);
      MidnamesHttp.json(res, 400, { error: message });
    }
  };
}

async function handleChallenge(_req: IncomingMessage, res: ServerResponse): Promise<void> {
  try {
    const nonce = crypto.randomUUID();
    MidnamesStore.challengeStore.set(nonce, { createdAt: Date.now(), used: false });
    MidnamesHttp.json(res, 200, { challenge: nonce, expiresIn: MidnamesServerConstants.CHALLENGE_TTL_MS / 1000 });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    logger.error(`Challenge generation failed: ${message}`);
    MidnamesHttp.json(res, 500, { error: "Failed to generate challenge" });
  }
}

function handleVerifyPresentation(ctx: VerificationRouteContext) {
  return async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
    try {
      const vp = MidnamesHttp.validateBody(res, VerifyPresentationSchema, JSON.parse(await MidnamesHttp.readBody(req)));
      if (!vp) return;

      const challenge = MidnamesStore.challengeStore.get(vp.proof.challenge);
      if (!challenge) { MidnamesHttp.json(res, 400, { error: "Unknown or expired challenge" }); return; }
      if (challenge.used) { MidnamesHttp.json(res, 400, { error: "Challenge already used" }); return; }
      challenge.used = true;

      const vc = vp.verifiableCredential[0];
      if (!vc) { MidnamesHttp.json(res, 400, { error: "No credential in presentation" }); return; }

      if (await isRevoked(ctx.providers, ctx.revocationAddress, vc.id)) {
        MidnamesHttp.json(res, 200, { verified: false, status: "revoked", error: "Credential has been revoked" });
        return;
      }

      const vcResult = await verifyCredentialSignature(ctx.providers, vc as any);
      if (!vcResult.valid) {
        MidnamesHttp.json(res, 200, { verified: false, status: "invalid", error: `Credential verification failed: ${vcResult.error}` });
        return;
      }

      const holderDid = vp.holder;
      if (!holderDid || !vc.credentialSubject?.id) {
        MidnamesHttp.json(res, 400, { error: "Missing holder DID" });
        return;
      }
      if (holderDid !== vc.credentialSubject.id) {
        MidnamesHttp.json(res, 200, { verified: false, status: "invalid", error: "Holder DID does not match credential subject" });
        return;
      }

      const vpSig = Buffer.from(vp.proof.proofValue, "base64");
      if (vpSig.length !== 64) {
        MidnamesHttp.json(res, 200, { verified: false, status: "invalid", error: `Invalid VP signature length: ${vpSig.length}` });
        return;
      }

      const holderContractAddress = holderDid.split(":")[3];
      if (!holderContractAddress) {
        MidnamesHttp.json(res, 200, { verified: false, status: "invalid", error: "Cannot parse holder DID contract address" });
        return;
      }

      const holderState = await ctx.providers.publicDataProvider.queryContractState(holderContractAddress);
      if (!holderState || !holderState.data) {
        MidnamesHttp.json(res, 200, { verified: false, status: "invalid", error: "Failed to resolve holder DID" });
        return;
      }

      const holderContract = DID.ledger(holderState.data);
      if (!holderContract.active || holderContract.deactivated) {
        MidnamesHttp.json(res, 200, { verified: false, status: "invalid", error: "Holder DID is not active" });
        return;
      }

      const holderKeyJwk = holderContract.verificationMethods.lookup("key-0")?.publicKeyJwk;
      if (!holderKeyJwk) {
        MidnamesHttp.json(res, 200, { verified: false, status: "invalid", error: "Holder public key not found in DID document" });
        return;
      }

      const holderPubKey = buildUncompressedPubKey(holderKeyJwk);
      const msgBytes = new TextEncoder().encode(vp.proof.challenge + (vc.id || ""));
      const vpValid = verifyP256(holderPubKey, vpSig, msgBytes);
      if (!vpValid) {
        MidnamesHttp.json(res, 200, { verified: false, status: "invalid", error: "Holder signature does not match DID public key" });
        return;
      }

      let cdcvmVerified = false;
      const cdcvmProofValue = vp.proof.cdcvmProofValue;
      if (cdcvmProofValue) {
        try {
          const hasKey1 = holderContract.verificationMethods.member("key-1");
          const cdcvmKeyJwk = hasKey1 ? holderContract.verificationMethods.lookup("key-1")?.publicKeyJwk : null;
          if (cdcvmKeyJwk) {
            const { createVerify, createPublicKey } = await import("node:crypto");
            const sigBuf = Buffer.from(cdcvmProofValue, "base64");
            const msgBuf = Buffer.from(vp.proof.challenge + (vc.id || ""), "utf-8");
            const pointHex = buildUncompressedPubKey(cdcvmKeyJwk).slice(2);
            const pointBuf = Buffer.from(pointHex, "hex");
            const spkiHeader = Buffer.from("3059301306072a8648ce3d020106082a8648ce3d030107034200", "hex");
            const spkiDer = Buffer.concat([spkiHeader, pointBuf]);
            const pubKey = createPublicKey({ key: spkiDer, format: "der", type: "spki" });
            const verifier = createVerify("SHA256");
            verifier.update(msgBuf);
            cdcvmVerified = verifier.verify(pubKey, sigBuf);
          }
        } catch (cdcvmErr) {
          logger.warn(`CDCVM verification error: ${cdcvmErr}`);
        }
      }

      MidnamesHttp.json(res, 200, { verified: true, status: "verified", holder: holderDid, credentialId: vc.id, cdcvmVerified });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      logger.error(`Verify presentation failed: ${message}`);
      MidnamesHttp.json(res, 400, { error: "Presentation verification failed" });
    }
  };
}

// ============================================================================
// Helpers
// ============================================================================

/**
 * Check if a credential has been revoked by querying the on-chain revocation list.
 *
 * A credential without an id cannot appear in the revocation list — returns false.
 * Throws if the contract state cannot be queried (caller's try/catch should turn
 * that into a 4xx response rather than a false "verified").
 */
export async function isRevoked(
  providers: MidnightDIDProviders,
  revocationAddress: string,
  credentialId: string | undefined,
): Promise<boolean> {
  if (!credentialId) return false;

  const state = await providers.publicDataProvider.queryContractState(revocationAddress);
  if (!state || !state.data) throw new Error("Failed to query revocation contract state");

  const led = revocationLedger(state.data);
  const hash = await hashCredentialId(credentialId);
  return led.revocationList.member(hash);
}

export async function verifyCredentialSignature(
  providers: MidnightDIDProviders,
  vc: { proof?: { proofValue?: string; verificationMethod?: string }; expirationDate?: string; validUntil?: string; [key: string]: unknown },
): Promise<SignatureVerificationResult> {
  try {
    const validation = validateCredentialStructure(vc);
    if (!validation.valid) return { valid: false, error: validation.error };

    if (vc.expirationDate && new Date(vc.expirationDate as string) < new Date()) {
      return { valid: false, error: "Credential has expired" };
    }
    if (vc.validUntil && new Date(vc.validUntil as string) < new Date()) {
      return { valid: false, error: "Credential validity period has ended" };
    }
    if (!vc.proof?.proofValue) return { valid: false, error: "Credential is missing proof or proofValue" };

    const sig = Buffer.from(vc.proof.proofValue, "base64");
    if (sig.length !== 64) return { valid: false, error: `Invalid signature length: ${sig.length} (expected 64)` };

    const { proof: _proof, ...vcWithoutProof } = vc;
    const jsonBytes = new TextEncoder().encode(canonicalize(vcWithoutProof));

    const splitted = vc.proof.verificationMethod!.split("#");
    const signatureKey = splitted[1];
    const contractAddress = splitted[0].split(":")[3];

    const state = await providers.publicDataProvider.queryContractState(contractAddress);
    if (!state || !state.data) throw new Error("Failed to query credential state");

    const contractData = DID.ledger(state.data);
    if (!contractData.active || contractData.deactivated) throw new Error("Issuer is not active");

    const publicKeyJwk = contractData.verificationMethods.lookup(signatureKey)?.publicKeyJwk;
    if (!publicKeyJwk) return { valid: false, error: `Public key ${signatureKey} not found in issuer DID document` };

    const expectedPubKey = buildUncompressedPubKey(publicKeyJwk);
    const valid = verifyP256(expectedPubKey, sig, jsonBytes);
    if (!valid) return { valid: false, error: "Signature verification failed" };
    return { valid: true };
  } catch (err) {
    return { valid: false, error: err instanceof Error ? err.message : "Unknown verification error" };
  }
}
