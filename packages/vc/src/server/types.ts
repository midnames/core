import type { ContractProviders, DeployedContract } from "@midnight-ntwrk/midnight-js-contracts";

export const MidnightDIDPrivateStateId = "midnightDIDPrivateState";

export type MidnightDIDProviders = ContractProviders<any, "addVerificationMethod", any>;

export type DeployedMidnightDIDContract = DeployedContract<any>;

export interface SignatureVerificationResult {
  valid: boolean;
  error?: string;
}

export type PublicKeyJwk = {
  kty: unknown;
  crv: unknown;
  x: bigint;
  y: bigint;
};
