import { WitnessContext } from "@midnight-ntwrk/compact-runtime";
import { Ledger } from "./managed/did/contract/index.js";
import { Ledger as RevocationLedger, Witnesses } from "./managed/revocation-list/contract/index.js";

export type MidnightDIDPrivateState = {
  readonly secretKey: Uint8Array;
};

export const witnesses = {
  localSecretKey: ({
    privateState,
  }: WitnessContext<Ledger, MidnightDIDPrivateState>): [MidnightDIDPrivateState, Uint8Array] =>
    [privateState, privateState.secretKey],

  currentTimestamp: ({
    privateState,
  }: WitnessContext<Ledger, MidnightDIDPrivateState>): [MidnightDIDPrivateState, bigint] =>
    [privateState, BigInt(Date.now())],
};

export type MidnightRevocationPrivateState = Record<string, never>;

export const revocationWitnesses: Witnesses<MidnightRevocationPrivateState> = {
  findAuthPath: (
    { ledger, privateState }: WitnessContext<RevocationLedger, MidnightRevocationPrivateState>,
    pk: { bytes: Uint8Array },
  ): [MidnightRevocationPrivateState, NonNullable<ReturnType<typeof ledger.revocationAuthority.findPathForLeaf>>] => {
    const path = ledger.revocationAuthority.findPathForLeaf(pk);
    if (!path) throw new Error("Authority not found in revocation authority merkle tree");
    return [privateState, path];
  },
};
