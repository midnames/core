import { CompiledContract } from "@midnight-ntwrk/compact-js";
import { nativeToken } from "@midnight-ntwrk/ledger-v8";
import * as ledger from "@midnight-ntwrk/ledger-v8";
import { deployContract, findDeployedContract } from "@midnight-ntwrk/midnight-js-contracts";
import { httpClientProofProvider } from "@midnight-ntwrk/midnight-js-http-client-proof-provider";
import { indexerPublicDataProvider } from "@midnight-ntwrk/midnight-js-indexer-public-data-provider";
import { levelPrivateStateProvider } from "@midnight-ntwrk/midnight-js-level-private-state-provider";
import { setNetworkId } from "@midnight-ntwrk/midnight-js-network-id";
import { NodeZkConfigProvider } from "@midnight-ntwrk/midnight-js-node-zk-config-provider";
import type { MidnightProvider, WalletProvider } from "@midnight-ntwrk/midnight-js-types";
import type { NetworkId } from "@midnight-ntwrk/wallet-sdk-abstractions";
import { DustWallet } from "@midnight-ntwrk/wallet-sdk-dust-wallet";
import { WalletFacade } from "@midnight-ntwrk/wallet-sdk-facade";
import { HDWallet, Roles } from "@midnight-ntwrk/wallet-sdk-hd";
import { ShieldedWallet } from "@midnight-ntwrk/wallet-sdk-shielded";
import {
  createKeystore,
  InMemoryTransactionHistoryStorage,
  PublicKey as UnshieldedPublicKey,
  type UnshieldedKeystore,
  UnshieldedWallet,
} from "@midnight-ntwrk/wallet-sdk-unshielded-wallet";
import { webcrypto } from "crypto";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import * as Rx from "rxjs";
import { mnemonicToSeedSync } from "bip39";
import { WebSocket } from "ws";

import type { Config, FullConfig } from "./config.js";
import { logger } from "./logger.js";
import {
  type MidnightDIDPrivateState,
  type MidnightRevocationPrivateState,
  witnesses,
  revocationWitnesses,
} from "./witnesses.js";
import {
  Contract,
  type VerificationMethod,
  VerificationMethodType,
  KeyType,
  CurveType,
} from "./managed/did/contract/index.js";
import { Contract as RevocationListContract } from "./managed/revocation-list/contract/index.js";
import {
  type DeployedMidnightDIDContract,
  MidnightDIDPrivateStateId,
  type MidnightDIDProviders,
} from "./types.js";

// @ts-expect-error globalThis WebSocket shim for apollo/ws
globalThis.WebSocket = WebSocket;

export interface WalletContext {
  wallet: WalletFacade;
  shieldedWallet: ReturnType<ReturnType<typeof ShieldedWallet>["startWithSecretKeys"]>;
  unshieldedWallet: ReturnType<ReturnType<typeof UnshieldedWallet>["startWithPublicKey"]>;
  dustWallet: ReturnType<ReturnType<typeof DustWallet>["startWithSecretKey"]>;
  shieldedSecretKeys: ledger.ZswapSecretKeys;
  dustSecretKey: ledger.DustSecretKey;
  unshieldedKeystore: UnshieldedKeystore;
}

type UnboundTransaction = ledger.Transaction<ledger.SignatureEnabled, ledger.Proof, ledger.PreBinding>;

export function createContractInstance(zkConfigPath: string) {
  return CompiledContract.make("midnight-did", Contract as any).pipe(
    CompiledContract.withWitnesses(witnesses as never),
    CompiledContract.withCompiledFileAssets(zkConfigPath),
  );
}

export async function hashProverKey(proverKey: Uint8Array): Promise<Uint8Array> {
  const hash = await webcrypto.subtle.digest("SHA-256", proverKey as unknown as ArrayBuffer);
  return new Uint8Array(hash);
}

export async function initPrivateState(providers: MidnightDIDProviders): Promise<MidnightDIDPrivateState> {
  let providedPrivateState: MidnightDIDPrivateState | null = null;
  try {
    providedPrivateState = await providers.privateStateProvider.get("midnightDIDPrivateState");
  } catch (error: unknown) {
    if (!(error instanceof Error) || !error.message.includes("Contract address not set")) {
      throw error;
    }
  }

  if (
    providedPrivateState != null &&
    providedPrivateState.secretKey != null &&
    providedPrivateState.secretKey.buffer instanceof ArrayBuffer &&
    providedPrivateState.secretKey.BYTES_PER_ELEMENT === 1 &&
    providedPrivateState.secretKey.length === 32
  ) {
    return providedPrivateState;
  }

  const proverKey = await (providers as any).zkConfigProvider.getProverKey("addVerificationMethod");
  const secretKey = await hashProverKey(proverKey);
  const privateState: MidnightDIDPrivateState = { secretKey } as unknown as MidnightDIDPrivateState;
  try {
    await providers.privateStateProvider.set(MidnightDIDPrivateStateId, privateState);
  } catch (error: unknown) {
    if (!(error instanceof Error) || !error.message.includes("Contract address not set")) {
      throw error;
    }
  }
  return privateState;
}

function makeVerificationMethod(
  keyId: string,
  crv: CurveType,
  publicKey: { x: string; y: string },
): VerificationMethod {
  return {
    id: keyId,
    typ: VerificationMethodType.JsonWebKey,
    publicKeyJwk: { kty: KeyType.EC, crv, x: BigInt("0x" + publicKey.x), y: BigInt("0x" + publicKey.y) },
  };
}

export function buildHolderKeyVerificationMethod(publicKey: { x: string; y: string }): VerificationMethod {
  return makeVerificationMethod("key-0", CurveType.P256, publicKey);
}

export function buildCdcvmKeyVerificationMethod(publicKey: { x: string; y: string }): VerificationMethod {
  return makeVerificationMethod("key-1", CurveType.P256, publicKey);
}

export const RevocationListPrivateStateId = "revocationListPrivateState";

export function createRevocationListContractInstance(zkConfigPath: string) {
  return CompiledContract.make("revocation-list", RevocationListContract as any).pipe(
    CompiledContract.withWitnesses(revocationWitnesses as never),
    CompiledContract.withCompiledFileAssets(zkConfigPath),
  );
}

export async function deployRevocationListContract(
  providers: MidnightDIDProviders,
  zkConfigPath: string,
  proofServerUrl: string,
): Promise<{ contract: any; address: string }> {
  logger.info("Deploying Revocation List contract...");

  const privateState: MidnightRevocationPrivateState = {};
  const compiledContract = createRevocationListContractInstance(zkConfigPath);

  const revocationZkConfigProvider = new NodeZkConfigProvider<
    "addRevocationAuthority" | "revokeCredential"
  >(zkConfigPath);

  const revocationProofProvider = httpClientProofProvider(proofServerUrl, revocationZkConfigProvider);

  const revocationProviders = {
    ...providers,
    zkConfigProvider: revocationZkConfigProvider,
    proofProvider: revocationProofProvider,
  };

  const deployedContract = await (deployContract as any)(revocationProviders, {
    compiledContract,
    privateStateId: RevocationListPrivateStateId,
    initialPrivateState: privateState,
    args: [],
  });

  const address = deployedContract.deployTxData.public.contractAddress;
  logger.info(`Revocation List contract deployed at: ${address}`);
  return { contract: deployedContract, address };
}

export async function findRevocationListContract(
  providers: MidnightDIDProviders,
  zkConfigPath: string,
  proofServerUrl: string,
  contractAddress: string,
): Promise<{ contract: any; address: string }> {
  logger.info(`Looking up existing Revocation List contract at ${contractAddress}...`);

  const privateState: MidnightRevocationPrivateState = {};
  const compiledContract = createRevocationListContractInstance(zkConfigPath);

  const revocationZkConfigProvider = new NodeZkConfigProvider<
    "addRevocationAuthority" | "revokeCredential"
  >(zkConfigPath);

  const revocationProofProvider = httpClientProofProvider(proofServerUrl, revocationZkConfigProvider);

  const revocationProviders = {
    ...providers,
    zkConfigProvider: revocationZkConfigProvider,
    proofProvider: revocationProofProvider,
  };

  const found = await (findDeployedContract as any)(revocationProviders, {
    compiledContract,
    contractAddress,
    privateStateId: RevocationListPrivateStateId,
    initialPrivateState: privateState,
  });

  logger.info(`Revocation List contract attached at: ${contractAddress}`);
  return { contract: found, address: contractAddress };
}

export const deploy = async (
  providers: MidnightDIDProviders,
  compiledContract: ReturnType<typeof createContractInstance>,
  privateState: MidnightDIDPrivateState,
  holderKey: { x: string; y: string },
  cdcvmKey?: { x: string; y: string },
): Promise<DeployedMidnightDIDContract> => {
  logger.info("Deploying Midnight DID contract...");
  const didContract = await (deployContract as any)(providers, {
    compiledContract,
    privateStateId: "midnightDIDPrivateState",
    initialPrivateState: privateState,
    args: [],
  });
  logger.info(`Deployed contract at address: ${didContract.deployTxData.public.contractAddress}`);

  const holderVm = makeVerificationMethod("key-0", CurveType.P256, holderKey);
  await didContract.callTx.addVerificationMethod(holderVm);
  logger.info("Added holder key (key-0) to deployed contract");

  if (cdcvmKey) {
    const cdcvmVm = buildCdcvmKeyVerificationMethod(cdcvmKey);
    await didContract.callTx.addVerificationMethod(cdcvmVm);
    logger.info("Added CDCVM key (key-1) to deployed contract");
  }

  return didContract as DeployedMidnightDIDContract;
};

export const createWalletAndMidnightProvider = async (
  walletContext: WalletContext,
): Promise<WalletProvider & MidnightProvider> => {
  await Rx.firstValueFrom(walletContext.wallet.state().pipe(Rx.filter((s) => s.isSynced)));

  return {
    getCoinPublicKey(): ledger.CoinPublicKey {
      return walletContext.shieldedSecretKeys.coinPublicKey as unknown as ledger.CoinPublicKey;
    },
    getEncryptionPublicKey(): ledger.EncPublicKey {
      return walletContext.shieldedSecretKeys.encryptionPublicKey as unknown as ledger.EncPublicKey;
    },
    async balanceTx(tx: UnboundTransaction, ttl?: Date): Promise<ledger.FinalizedTransaction> {
      const txTtl = ttl ?? new Date(Date.now() + 30 * 60 * 1000);
      const recipe = await walletContext.wallet.balanceUnboundTransaction(
        tx,
        { shieldedSecretKeys: walletContext.shieldedSecretKeys, dustSecretKey: walletContext.dustSecretKey },
        { ttl: txTtl },
      );
      return walletContext.wallet.finalizeRecipe(recipe);
    },
    async submitTx(tx: ledger.FinalizedTransaction): Promise<ledger.TransactionId> {
      return walletContext.wallet.submitTransaction(tx);
    },
  };
};

export const waitForSync = (wallet: WalletFacade) =>
  Rx.firstValueFrom(
    wallet.state().pipe(
      Rx.throttleTime(5_000),
      Rx.tap((state) => logger.debug(`Waiting for wallet sync. Synced: ${state.isSynced}`)),
      Rx.filter((state) => state.isSynced),
    ),
  );

export const waitForFunds = (wallet: WalletFacade) =>
  Rx.firstValueFrom(
    wallet.state().pipe(
      Rx.throttleTime(10_000),
      Rx.tap((state) => {
        const unshielded = state.unshielded?.balances[nativeToken().raw] ?? 0n;
        const shielded = state.shielded?.balances[nativeToken().raw] ?? 0n;
        logger.debug(`Waiting for funds. Synced: ${state.isSynced}, Total: ${unshielded + shielded}`);
      }),
      Rx.filter((state) => state.isSynced),
      Rx.map(
        (s) =>
          (s.unshielded?.balances[nativeToken().raw] ?? 0n) +
          (s.shielded?.balances[nativeToken().raw] ?? 0n),
      ),
      Rx.filter((balance) => balance > 0n),
    ),
  );

const walletCachePath = () => path.resolve(os.homedir(), ".midnames-wallet-cache.json");

interface WalletCache {
  shielded: string;
  unshielded: string;
  dust: string;
}

function readWalletCache(): WalletCache | null {
  try {
    const raw = fs.readFileSync(walletCachePath(), "utf-8");
    const parsed = JSON.parse(raw);
    if (parsed.shielded && parsed.unshielded && parsed.dust) return parsed as WalletCache;
    return null;
  } catch {
    return null;
  }
}

function writeWalletCache(cache: WalletCache): void {
  try {
    fs.writeFileSync(walletCachePath(), JSON.stringify(cache), "utf-8");
    logger.info(`Wallet state cached to ${walletCachePath()}`);
  } catch (e) {
    logger.error(`Failed to write wallet cache: ${e}`);
  }
}

export const initWalletWithSeed = async (seed: Buffer, config: Config): Promise<WalletContext> => {
  const hdWallet = HDWallet.fromSeed(seed);
  if (hdWallet.type !== "seedOk") throw new Error("Failed to initialize HDWallet");

  const derivationResult = hdWallet.hdWallet
    .selectAccount(0)
    .selectRoles([Roles.Zswap, Roles.NightExternal, Roles.Dust])
    .deriveKeysAt(0);

  if (derivationResult.type !== "keysDerived") throw new Error("Failed to derive keys");
  hdWallet.hdWallet.clear();

  const shieldedSecretKeys = ledger.ZswapSecretKeys.fromSeed(derivationResult.keys[Roles.Zswap]);
  const dustSecretKey = ledger.DustSecretKey.fromSeed(derivationResult.keys[Roles.Dust]);
  const unshieldedKeystore = createKeystore(
    derivationResult.keys[Roles.NightExternal],
    config.networkId as NetworkId.NetworkId,
  );

  const walletConfiguration = {
    networkId: config.networkId as NetworkId.NetworkId,
    costParameters: { additionalFeeOverhead: 1_000_000_000n, feeBlocksMargin: 5 },
    relayURL: new URL(config.node.replace(/^http/, "ws")),
    provingServerUrl: new URL(config.proofServer),
    indexerClientConnection: { indexerHttpUrl: config.indexer, indexerWsUrl: config.indexerWS },
    indexerUrl: config.indexerWS,
    txHistoryStorage: new InMemoryTransactionHistoryStorage(),
  };

  const cache = readWalletCache();

  let shieldedWallet;
  let dustWallet;
  let unshieldedWallet;

  if (cache) {
    logger.info("Restoring wallet from cached state...");
    try {
      shieldedWallet = ShieldedWallet(walletConfiguration).restore(cache.shielded);
      dustWallet = DustWallet(walletConfiguration).restore(cache.dust);
      unshieldedWallet = UnshieldedWallet(walletConfiguration).restore(cache.unshielded);
    } catch (e) {
      logger.warn(`Failed to restore from cache, starting fresh: ${e}`);
      shieldedWallet = ShieldedWallet(walletConfiguration).startWithSecretKeys(shieldedSecretKeys);
      dustWallet = DustWallet(walletConfiguration).startWithSecretKey(
        dustSecretKey,
        ledger.LedgerParameters.initialParameters().dust,
      );
      unshieldedWallet = UnshieldedWallet(walletConfiguration).startWithPublicKey(
        UnshieldedPublicKey.fromKeyStore(unshieldedKeystore),
      );
    }
  } else {
    shieldedWallet = ShieldedWallet(walletConfiguration).startWithSecretKeys(shieldedSecretKeys);
    dustWallet = DustWallet(walletConfiguration).startWithSecretKey(
      dustSecretKey,
      ledger.LedgerParameters.initialParameters().dust,
    );
    unshieldedWallet = UnshieldedWallet(walletConfiguration).startWithPublicKey(
      UnshieldedPublicKey.fromKeyStore(unshieldedKeystore),
    );
  }

  const facade = await WalletFacade.init({
    configuration: walletConfiguration,
    shielded: () => shieldedWallet,
    unshielded: () => unshieldedWallet,
    dust: () => dustWallet,
  });
  await facade.start(shieldedSecretKeys as any, dustSecretKey as any);

  return { wallet: facade, shieldedWallet, unshieldedWallet, dustWallet, shieldedSecretKeys, dustSecretKey, unshieldedKeystore };
};

export const buildWalletAndWaitForFunds = async (config: Config, seedOrMnemonic: string): Promise<WalletContext> => {
  const isHex = /^[0-9a-fA-F]+$/.test(seedOrMnemonic.trim());
  const seed = isHex ? Buffer.from(seedOrMnemonic.trim(), "hex") : mnemonicToSeedSync(seedOrMnemonic.trim());
  const walletContext = await initWalletWithSeed(seed, config);
  logger.debug(`Wallet address: ${walletContext.unshieldedKeystore.getBech32Address().asString()}`);
  await waitForSync(walletContext.wallet);

  const state = await Rx.firstValueFrom(walletContext.wallet.state());
  const total =
    (state.unshielded?.balances[nativeToken().raw] ?? 0n) +
    (state.shielded?.balances[nativeToken().raw] ?? 0n);

  if (total === 0n) {
    logger.debug("Waiting to receive tokens...");
    await waitForFunds(walletContext.wallet);
  }

  return walletContext;
};

export const configureProviders = async (
  walletContext: WalletContext,
  config: FullConfig,
): Promise<MidnightDIDProviders> => {
  setNetworkId(config.networkId);

  const walletAndMidnightProvider = await createWalletAndMidnightProvider(walletContext);
  const zkConfigProvider = new NodeZkConfigProvider<"addVerificationMethod">(config.zkConfigPath);

  return {
    privateStateProvider: levelPrivateStateProvider<typeof MidnightDIDPrivateStateId>({
      privateStateStoreName: config.privateStateStoreName,
      privateStoragePasswordProvider: async () =>
        process.env.MIDNAMES_PRIVATE_STATE_PASSWORD ?? `${config.privateStateStoreName}!A1`,
      accountId: "default",
    }),
    publicDataProvider: indexerPublicDataProvider(config.indexer, config.indexerWS),
    zkConfigProvider,
    proofProvider: httpClientProofProvider(config.proofServer, zkConfigProvider),
    walletProvider: walletAndMidnightProvider,
    midnightProvider: walletAndMidnightProvider,
  };
};

export const closeWallet = async (walletContext: WalletContext): Promise<void> => {
  try {
    const shielded = await walletContext.shieldedWallet.serializeState();
    const unshielded = await walletContext.unshieldedWallet.serializeState();
    const dust = await walletContext.dustWallet.serializeState();
    writeWalletCache({ shielded, unshielded, dust });
  } catch (e) {
    logger.error(`Error saving wallet state: ${e}`);
  }
  try {
    await walletContext.wallet.stop();
  } catch (e) {
    logger.error(`Error closing wallet: ${e}`);
  }
};
