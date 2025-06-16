import { Midnames, type MidnamesPrivateState } from '@midnames/core';
import type { ImpureCircuitId, MidnightProviders } from '@midnight-ntwrk/midnight-js-types';
import type { DeployedContract, FoundContract } from '@midnight-ntwrk/midnight-js-contracts';

export type MidnamesCircuits = ImpureCircuitId<Midnames.Contract<MidnamesPrivateState>>;

export const MidnamesPrivateStateId = 'midnamesPrivateState';

export type MidnamesProviders = MidnightProviders<
  MidnamesCircuits,
  typeof MidnamesPrivateStateId,
  MidnamesPrivateState
>;

export type MidnamesContract = Midnames.Contract<MidnamesPrivateState>;

export type DeployedMidnamesContract = DeployedContract<MidnamesContract> | FoundContract<MidnamesContract>;
