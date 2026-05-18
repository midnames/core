export interface VerifiableCredential<TSubject = Record<string, unknown>> {
  "@context": string[];
  id?: string;
  type: ["VerifiableCredential", ...string[]];
  issuer: Issuer;
  issuanceDate?: string;
  validFrom?: string;
  expirationDate?: string;
  validUntil?: string;
  name?: string;
  verificationService?: string;
  credentialSubject: TSubject & { id?: string };
  credentialStatus?: CredentialStatus;
  proof?: Proof;
  [key: string]: unknown;
}

export type Issuer = string | { id: string; name?: string; image?: string; [key: string]: unknown };

export interface Proof {
  type: string;
  created: string;
  proofPurpose: string;
  verificationMethod: string;
  jws?: string;
  proofValue?: string;
  challenge?: string;
  [key: string]: unknown;
}

export interface CredentialStatus {
  id: string;
  type: CredentialStatusType;
  revocationListIndex: string;
  revocationListCredential: string;
}

export enum CredentialStatusType {
  RevocationList2026Status = "RevocationList2026Status",
  CredentialStatusList2026 = "CredentialStatusList2026",
}

export interface VerifiablePresentation<TSubject = Record<string, unknown>> {
  type: string;
  verifiableCredential: VerifiableCredential<TSubject>[];
  holder: string;
  proof: PresentationProof;
}

export interface PresentationProof {
  type: string;
  challenge: string;
  created: string;
  proofValue: string;
  cdcvmProofValue?: string;
}
