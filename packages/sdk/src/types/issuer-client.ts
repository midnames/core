/**
 * Issuance Protocol Types
 *
 * Based on OIDC4VCI (OpenID for Verifiable Credential Issuance) patterns,
 * simplified for direct issuer-holder interaction without full OAuth flow.
 *
 * Generic over TSubject — the shape of the credential subject data.
 * Consuming projects define TSubject and pass a validator at offer time.
 */
import type { VerifiableCredential } from "./credential.js";

export interface CredentialOffer {
  credential_issuer: string;
  credential_types: string[];
  grants: {
    "urn:ietf:params:oauth:grant-type:pre-authorized_code": {
      "pre-authorized_code": string;
    };
  };
  credential_endpoint?: string;
  ttl?: string;
}

export type IssuanceSessionState =
  | "pending"
  | "acknowledged"
  | "issued"
  | "expired"
  | "revoked";

export interface IssuanceSession<TSubject = unknown> {
  id: string;
  issuerDid: string;
  credentialTypes: string[];
  state: IssuanceSessionState;
  holderCommitment?: string;
  holderDid?: string;
  subjectData?: TSubject;
  createdAt: number;
  expiresAt: number;
  updatedAt: number;
  issuedCredentialId?: string;
}

export interface CreateOfferOptions<TSubject> {
  subjectData: TSubject;
  credentialTypes: string[];
  expiresIn: number;
  credentialEndpoint?: string;
  issuerMetadata?: {
    name?: string;
    logo_uri?: string;
    description?: string;
  };
}

export interface AcknowledgeRequest {
  preAuthorizedCode: string;
  holderCommitment: string;
  holderDid?: string;
}

export interface AcknowledgeResponse {
  accepted: boolean;
  sessionId: string;
  error?: string;
  credentialEndpoint?: string;
}

export interface IssuanceCredentialRequest {
  sessionId: string;
  holderCommitment: string;
}

export interface IssuanceCredentialResponse<TSubject = unknown> {
  success: boolean;
  verifiableCredential?: VerifiableCredential<TSubject>;
  error?: string;
  errorCode?: IssuanceErrorCode;
}

export type IssuanceErrorCode =
  | "SESSION_NOT_FOUND"
  | "SESSION_EXPIRED"
  | "SESSION_ALREADY_USED"
  | "INVALID_STATE"
  | "COMMITMENT_MISMATCH"
  | "INVALID_SUBJECT_DATA"
  | "ISSUANCE_FAILED";

export interface ISessionStore<TSubject = unknown> {
  get(id: string): IssuanceSession<TSubject> | undefined;
  create(session: IssuanceSession<TSubject>): void;
  update(id: string, updates: Partial<IssuanceSession<TSubject>>): boolean;
}

export type SessionValidationResult<TSubject = unknown> =
  | { success: true; session: IssuanceSession<TSubject> }
  | { success: false; error: string; errorCode?: IssuanceErrorCode };

export function getSessionIdFromOffer(offer: CredentialOffer): string {
  return offer.grants["urn:ietf:params:oauth:grant-type:pre-authorized_code"][
    "pre-authorized_code"
  ];
}

export function offerToQRString(offer: CredentialOffer): string {
  return JSON.stringify(offer);
}
