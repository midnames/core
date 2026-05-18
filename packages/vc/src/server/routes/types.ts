import type { MidnightDIDProviders } from "../types.js";
import type { MidnightDIDPrivateState } from "../witnesses.js";
import type { WalletContext } from "../providers.js";

export interface CredentialRouteContext<TSubject> {
  providers: MidnightDIDProviders;
  privateState: MidnightDIDPrivateState;
  zkConfigPath: string;
  networkId: string;
  waitForSync: () => Promise<void>;
  credentialType: string[];
  validateSubject: (raw: unknown) => TSubject;
  buildCredential: (subject: TSubject, holderDid: string, issuerDid: string) => TSubject & { id: string };
  onIssued?: (vc: import("@midnames/vc/core").VerifiableCredential<TSubject>) => Promise<void> | void;
}

export interface DidRouteContext {
  providers: MidnightDIDProviders;
  privateState: MidnightDIDPrivateState;
  walletContext: WalletContext;
  zkConfigPath: string;
}

export interface VerificationRouteContext {
  providers: MidnightDIDProviders;
  revocationAddress: string;
}

export interface RevocationRouteContext {
  providers: MidnightDIDProviders;
  revocationContract: any;
  revocationAddress: string;
  waitForSync: () => Promise<void>;
}
