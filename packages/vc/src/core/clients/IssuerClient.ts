import { randomUUID, timingSafeEqual } from "node:crypto";
import type {
  AcknowledgeRequest,
  AcknowledgeResponse,
  CreateOfferOptions,
  CredentialOffer,
  IssuanceCredentialRequest,
  IssuanceSession,
  ISessionStore,
  SessionValidationResult,
} from "../types/issuer-client.js";

/**
 * IssuerClient handles the issuer-side protocol logic for credential issuance.
 *
 * Stateless — all state is managed through the provided ISessionStore.
 * Generic over TSubject: the shape of credential subject data your project defines.
 *
 * Security notes:
 * - Pre-authorized codes use crypto.randomUUID() (122 bits of entropy).
 * - State machine enforces pending → acknowledged → issued (no replay).
 * - Commitment comparison uses constant-time comparison (timing-attack resistant).
 */
export class IssuerClient {
  createOffer<TSubject>(
    issuerDid: string,
    options: CreateOfferOptions<TSubject>,
    store: ISessionStore<TSubject>,
  ): CredentialOffer {
    const now = Date.now();
    const expiresIn = options.expiresIn ?? 300;
    const pre_authorized_code = randomUUID();

    const sessionData: IssuanceSession<TSubject> = {
      id: pre_authorized_code,
      createdAt: now,
      updatedAt: now,
      expiresAt: now + expiresIn * 1000,
      credentialTypes: options.credentialTypes,
      issuerDid,
      state: "pending",
      holderCommitment: "0",
      subjectData: options.subjectData,
    };

    store.create(sessionData);

    return {
      credential_issuer: issuerDid,
      credential_types: options.credentialTypes,
      grants: {
        "urn:ietf:params:oauth:grant-type:pre-authorized_code": {
          "pre-authorized_code": pre_authorized_code,
        },
      },
      credential_endpoint: options.credentialEndpoint,
      ttl: expiresIn.toString(),
    };
  }

  acknowledgeResponse<TSubject>(
    request: AcknowledgeRequest,
    storage: ISessionStore<TSubject>,
  ): AcknowledgeResponse {
    const session = storage.get(request.preAuthorizedCode);

    if (!session) {
      return {
        accepted: false,
        sessionId: request.preAuthorizedCode,
        error: `Session not found for code ${request.preAuthorizedCode}`,
      };
    }

    switch (session.state) {
      case "expired":
        return { accepted: false, sessionId: request.preAuthorizedCode, error: `Session expired` };
      case "acknowledged":
        return { accepted: false, sessionId: request.preAuthorizedCode, error: `Session already acknowledged` };
      case "pending":
        break;
      default:
        return {
          accepted: false,
          sessionId: request.preAuthorizedCode,
          error: `Invalid session state: ${session.state}`,
        };
    }

    if (!request.holderCommitment || request.holderCommitment === "0") {
      return { accepted: false, sessionId: request.preAuthorizedCode, error: "Holder commitment not provided" };
    }

    const updated = storage.update(request.preAuthorizedCode, {
      state: "acknowledged",
      holderCommitment: request.holderCommitment,
      holderDid: request.holderDid,
    });

    if (!updated) {
      return { accepted: false, sessionId: request.preAuthorizedCode, error: "Failed to update session" };
    }

    return { accepted: true, sessionId: request.preAuthorizedCode };
  }

  validateAndConsumeSession<TSubject>(
    req: IssuanceCredentialRequest,
    storage: ISessionStore<TSubject>,
  ): SessionValidationResult<TSubject> {
    const session = storage.get(req.sessionId);

    if (!session) {
      return { success: false, error: `Session not found: ${req.sessionId}`, errorCode: "SESSION_NOT_FOUND" };
    }
    if (session.state === "expired") {
      return { success: false, error: "Session has expired", errorCode: "SESSION_EXPIRED" };
    }
    if (session.state === "issued") {
      return { success: false, error: "Credential already issued for this session", errorCode: "SESSION_ALREADY_USED" };
    }
    if (session.state !== "acknowledged") {
      return { success: false, error: `Invalid session state: ${session.state}`, errorCode: "INVALID_STATE" };
    }
    if (!session.subjectData) {
      return { success: false, error: "Session missing subject data", errorCode: "INVALID_SUBJECT_DATA" };
    }
    if (!session.holderCommitment) {
      return { success: false, error: "Session missing holder commitment", errorCode: "COMMITMENT_MISMATCH" };
    }
    if (!this.constantTimeCompare(session.holderCommitment, req.holderCommitment)) {
      return { success: false, error: "Commitment mismatch", errorCode: "COMMITMENT_MISMATCH" };
    }

    storage.update(session.id, { state: "issued" });
    return { success: true, session };
  }

  markIssuedCredentialId<TSubject>(
    sessionId: string,
    credentialId: string,
    storage: ISessionStore<TSubject>,
  ): void {
    storage.update(sessionId, { issuedCredentialId: credentialId });
  }

  private constantTimeCompare(a: string, b: string): boolean {
    const bufA = Buffer.from(a);
    const bufB = Buffer.from(b);
    if (bufA.length !== bufB.length) {
      timingSafeEqual(bufA, bufA);
      return false;
    }
    return timingSafeEqual(bufA, bufB);
  }
}
