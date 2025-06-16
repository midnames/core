import { WitnessContext } from '@midnight-ntwrk/compact-runtime';
import { Ledger } from './managed/midnames/contract/index.cjs';

export type MidnamesPrivateState = {
  readonly local_secret_key: Uint8Array;
  readonly multiple_local_secret_keys: Uint8Array[];
};

export const createMidnamesSecretState = (
  local_secret_key: Uint8Array,
  multiple_local_secret_keys: Uint8Array[] = []
): MidnamesPrivateState => ({
  local_secret_key,
  multiple_local_secret_keys,
});

export const witnesses = {
  local_secret_key: ({
    privateState,
  }: WitnessContext<Ledger, MidnamesPrivateState>): [MidnamesPrivateState, Uint8Array] => [
    privateState,
    privateState.local_secret_key,
  ],
  multiple_local_secret_keys: ({
    privateState,
  }: WitnessContext<Ledger, MidnamesPrivateState>): [MidnamesPrivateState, Uint8Array[]] => [
    privateState,
    privateState.multiple_local_secret_keys,
  ],
};
