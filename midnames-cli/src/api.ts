import {
  Midnames,
  type MidnamesPrivateState,
  witnesses,
  createMidnamesSecretState,
} from "@midnames/core";
import {
  type CoinInfo,
  nativeToken,
  Transaction,
  type TransactionId,
} from "@midnight-ntwrk/ledger";
import {
  deployContract,
  findDeployedContract,
} from "@midnight-ntwrk/midnight-js-contracts";
import { httpClientProofProvider } from "@midnight-ntwrk/midnight-js-http-client-proof-provider";
import { indexerPublicDataProvider } from "@midnight-ntwrk/midnight-js-indexer-public-data-provider";
import { NodeZkConfigProvider } from "@midnight-ntwrk/midnight-js-node-zk-config-provider";
import {
  type BalancedTransaction,
  createBalancedTx,
  type MidnightProvider,
  type UnbalancedTransaction,
  type WalletProvider,
} from "@midnight-ntwrk/midnight-js-types";
import { type Resource, WalletBuilder } from "@midnight-ntwrk/wallet";
import { type Wallet } from "@midnight-ntwrk/wallet-api";
import { Transaction as ZswapTransaction } from "@midnight-ntwrk/zswap";
import { webcrypto } from "crypto";
import { type Logger } from "pino";
import * as Rx from "rxjs";
import { WebSocket } from "ws";
import {
  type MidnamesCircuits,
  type MidnamesContract,
  MidnamesPrivateStateId,
  type MidnamesProviders,
  type DeployedMidnamesContract,
} from "./common-types";
import { type Config, contractConfig } from "./config";
import { levelPrivateStateProvider } from "@midnight-ntwrk/midnight-js-level-private-state-provider";
import {
  getLedgerNetworkId,
  getZswapNetworkId,
} from "@midnight-ntwrk/midnight-js-network-id";
import * as fs from "fs";
import {
  stringToUint8Array,
  toVector5Maybes,
  formatUint8Array,
  uint8ArrayToString,
  formatDidData,
  parsePublicKeyHex,
  parseAdaAddress,
  toControllerVector,
} from "@midnames/utils";
import { toHex } from "@midnight-ntwrk/midnight-js-utils";
import { type DidJsonDocument } from "./types";

let logger: Logger;

// @ts-expect-error: It's needed to enable WebSocket usage through apollo
globalThis.WebSocket = WebSocket;

export const midnamesContractInstance: MidnamesContract = new Midnames.Contract(
  witnesses
);

export const joinContract = async (
  providers: MidnamesProviders,
  contractAddress: string
): Promise<DeployedMidnamesContract> => {
  const localSecretKey = randomBytes(32);
  const initialPrivateState = createMidnamesSecretState(
    localSecretKey,
    Array.from({ length: 5 }, () => new Uint8Array(32))
  );

  const midnamesContract = await findDeployedContract(providers, {
    contractAddress,
    contract: midnamesContractInstance,
    privateStateId: MidnamesPrivateStateId,
    initialPrivateState,
  });
  logger.info(
    `Joined contract at address: ${midnamesContract.deployTxData.public.contractAddress}
Witness: 
- local_secret_key: ${Buffer.from(localSecretKey).toString("hex")}
    `
  );
  return midnamesContract;
};

export const deploy = async (
  providers: MidnamesProviders,
  privateState: MidnamesPrivateState
): Promise<DeployedMidnamesContract> => {
  logger.info("Deploying midnames contract...");

  // default context for contract initialization
  const defaultContext = { uri: "https://www.w3.org/ns/did/v1" };

  logger.debug(
    `DEBUG: About to deploy with NetworkId: ${getZswapNetworkId()}, LedgerNetworkId: ${getLedgerNetworkId()}`
  );
  logger.debug(`DEBUG: PrivateStateId: ${MidnamesPrivateStateId}`);
  logger.debug(`DEBUG: DefaultContext: ${JSON.stringify(defaultContext)}`);

  try {
    const midnamesContract = await deployContract(providers, {
      contract: midnamesContractInstance,
      privateStateId: MidnamesPrivateStateId,
      initialPrivateState: privateState,
      args: [defaultContext],
    });
    logger.debug("DEBUG: deployContract succeeded");
    logger.info(
      `Deployed contract at address: ${midnamesContract.deployTxData.public.contractAddress}`
    );
    return midnamesContract;
  } catch (error) {
    logger.error(`ERROR: deployContract failed: ${error}`);
    throw error;
  }
};

export const displayContractInfo = async (
  providers: MidnamesProviders,
  midnamesContract: DeployedMidnamesContract
): Promise<{ contractAddress: string; didCount: bigint }> => {
  const contractAddress = midnamesContract.deployTxData.public.contractAddress;

  // contract state to count DIDs
  const state =
    await providers.publicDataProvider.queryContractState(contractAddress);

  const didCount = state ? Midnames.ledger(state.data).did_context.size() : 0n;

  logger.info(`Contract Address: ${contractAddress}`);
  logger.info(`Total DIDs: ${didCount}`);

  return { contractAddress, didCount };
};

export const getDid = async (
  providers: MidnamesProviders,
  contractAddress: string,
  didId: string
): Promise<any | null> => {
  try {
    const didIdBytes = stringToUint8Array(didId, 64);

    const state =
      await providers.publicDataProvider.queryContractState(contractAddress);
    if (!state) {
      logger.error("Could not query contract state");
      return null;
    }

    const ledgerState = Midnames.ledger(state.data);

    // Check if DID exists by looking in did_context (since that's what always gets populated)
    const contextExists = ledgerState.did_context.member(didIdBytes);
    if (!contextExists) {
      logger.info(`DID not found: ${didId}`);
      return null;
    }
    const didData = {
      id: didId,
      exists: true,
      context: [] as any[],
      verificationMethods: [] as any[],
      authenticationMethods: [] as any[],
      services: [] as any[],
      credentials: [] as any[],
      authorizedControllers: [] as any[],
    };

    const contextList = ledgerState.did_context.lookup(didIdBytes);
    for (const ctx of contextList) {
      didData.context.push(ctx);
    }

    // Put the w3c uri first
    if (didData.context.length > 1) {
      const w3cIndex = didData.context.findIndex(
        (ctx: any) => ctx.uri === "https://www.w3.org/ns/did/v1"
      );
      if (w3cIndex > 0) {
        const [w3cCtx] = didData.context.splice(w3cIndex, 1);
        didData.context.unshift(w3cCtx);
      }
    }

    const vmList = ledgerState.did_verification_methods.lookup(didIdBytes);
    for (const vm of vmList) {
      didData.verificationMethods.push(vm);
    }

    const authList = ledgerState.did_authentication_methods.lookup(didIdBytes);
    for (const auth of authList) {
      didData.authenticationMethods.push(auth);
    }

    const serviceList = ledgerState.did_services.lookup(didIdBytes);
    for (const service of serviceList) {
      didData.services.push(service);
    }

    const credentialList = ledgerState.did_credentials.lookup(didIdBytes);
    for (const credential of credentialList) {
      didData.credentials.push(credential);
    }

    const controllerSet =
      ledgerState.did_authorized_controllers.lookup(didIdBytes);
    for (const controller of controllerSet) {
      didData.authorizedControllers.push(controller);
    }

    return didData;
  } catch (error) {
    logger.error(`Failed to retrieve DID: ${error}`);
    return null;
  }
};

export interface DidDocument {
  "@context": string[];
  id: string;
  verificationMethod?: Array<{
    id: string;
    type: string;
    controller: string;
    publicKeyHex?: string;
    AdaAddress?: string;
    publicKeyMultibase?: string;
  }>;
  authentication?: Array<
    | string
    | {
        id: string;
        type: string;
        controller: string;
        publicKeyHex?: string;
        AdaAddress?: string;
        publicKeyMultibase?: string;
      }
  >;
  service?: Array<{
    id: string;
    type: string;
    serviceEndpoint: string;
  }>;
  credentials?: Array<{
    data: string;
    publicKeyMultibase: string;
  }>;
  updated?: string;
  _metadata?: {
    authorizedControllers: string[];
    exists: boolean;
  };
}

export const getDidFormatted = async (
  providers: MidnamesProviders,
  contractAddress: string,
  didId: string
): Promise<DidDocument | null> => {
  const rawData = await getDid(providers, contractAddress, didId);
  if (!rawData) return null;
  return formatDidData(rawData);
};

export const createWalletAndMidnightProvider = async (
  wallet: Wallet
): Promise<WalletProvider & MidnightProvider> => {
  const state = await Rx.firstValueFrom(wallet.state());
  return {
    coinPublicKey: state.coinPublicKey,
    encryptionPublicKey: state.encryptionPublicKey,
    balanceTx(
      tx: UnbalancedTransaction,
      newCoins: CoinInfo[]
    ): Promise<BalancedTransaction> {
      return wallet
        .balanceTransaction(
          ZswapTransaction.deserialize(
            tx.serialize(getLedgerNetworkId()),
            getZswapNetworkId()
          ),
          newCoins
        )
        .then((tx) => wallet.proveTransaction(tx))
        .then((zswapTx) =>
          Transaction.deserialize(
            zswapTx.serialize(getZswapNetworkId()),
            getLedgerNetworkId()
          )
        )
        .then(createBalancedTx);
    },
    submitTx(tx: BalancedTransaction): Promise<TransactionId> {
      return wallet.submitTransaction(tx);
    },
  };
};

export const waitForSync = (wallet: Wallet) =>
  Rx.firstValueFrom(
    wallet.state().pipe(
      Rx.throttleTime(5_000),
      Rx.tap((state) => {
        const applyGap = state.syncProgress?.lag.applyGap ?? 0n;
        const sourceGap = state.syncProgress?.lag.sourceGap ?? 0n;
        logger.info(
          `Waiting for sync. Backend lag: ${sourceGap}, wallet lag: ${applyGap}, transactions=${state.transactionHistory.length}`
        );
      }),
      Rx.filter((state) => {
        return state.syncProgress !== undefined && state.syncProgress.synced;
      })
    )
  );

export const waitForSyncProgress = async (wallet: Wallet) =>
  await Rx.firstValueFrom(
    wallet.state().pipe(
      Rx.throttleTime(5_000),
      Rx.tap((state) => {
        const applyGap = state.syncProgress?.lag.applyGap ?? 0n;
        const sourceGap = state.syncProgress?.lag.sourceGap ?? 0n;
        logger.info(
          `Waiting for sync progress. Backend lag: ${sourceGap}, wallet lag: ${applyGap}, transactions=${state.transactionHistory.length}`
        );
      }),
      Rx.filter((state) => {
        return state.syncProgress !== undefined;
      })
    )
  );

export const waitForFunds = (wallet: Wallet) =>
  Rx.firstValueFrom(
    wallet.state().pipe(
      Rx.throttleTime(10_000),
      Rx.tap((state) => {
        const applyGap = state.syncProgress?.lag.applyGap ?? 0n;
        const sourceGap = state.syncProgress?.lag.sourceGap ?? 0n;
        logger.info(
          `Waiting for funds. Backend lag: ${sourceGap}, wallet lag: ${applyGap}, transactions=${state.transactionHistory.length}`
        );
      }),
      Rx.filter((state) => {
        return state.syncProgress?.synced === true;
      }),
      Rx.map((s) => s.balances[nativeToken()] ?? 0n),
      Rx.filter((balance) => balance > 0n)
    )
  );

export const buildWalletAndWaitForFunds = async (
  { indexer, indexerWS, node, proofServer }: Config,
  seed: string,
  filename: string
): Promise<Wallet & Resource> => {
  const directoryPath = process.env.SYNC_CACHE;
  let wallet: Wallet & Resource;
  if (directoryPath !== undefined) {
    if (fs.existsSync(`${directoryPath}/${filename}`)) {
      logger.info(
        `Attempting to restore state from ${directoryPath}/${filename}`
      );
      try {
        const serialized = fs.readFileSync(
          `${directoryPath}/${filename}`,
          "utf-8"
        );
        wallet = await WalletBuilder.restore(
          indexer,
          indexerWS,
          proofServer,
          node,
          seed,
          serialized,
          "info"
        );
        wallet.start();

        const newState = await waitForSync(wallet);
        if (!newState.syncProgress?.synced) {
          logger.warn(
            "Wallet was not able to sync from restored state, building wallet from scratch"
          );
          wallet = await WalletBuilder.buildFromSeed(
            indexer,
            indexerWS,
            proofServer,
            node,
            seed,
            getZswapNetworkId(),
            "info"
          );
          wallet.start();
        }
      } catch (error: unknown) {
        if (typeof error === "string") {
          logger.error(error);
        } else if (error instanceof Error) {
          logger.error(error.message);
        } else {
          logger.error(error);
        }
        logger.warn(
          "Wallet was not able to restore using the stored state, building wallet from scratch"
        );
        wallet = await WalletBuilder.buildFromSeed(
          indexer,
          indexerWS,
          proofServer,
          node,
          seed,
          getZswapNetworkId(),
          "info"
        );
        wallet.start();
      }
    } else {
      logger.info("Wallet save file not found, building wallet from scratch");
      wallet = await WalletBuilder.buildFromSeed(
        indexer,
        indexerWS,
        proofServer,
        node,
        seed,
        getZswapNetworkId(),
        "info"
      );
      wallet.start();
    }
  } else {
    logger.info(
      "File path for save file not found, building wallet from scratch"
    );
    wallet = await WalletBuilder.buildFromSeed(
      indexer,
      indexerWS,
      proofServer,
      node,
      seed,
      getZswapNetworkId(),
      "info"
    );
    wallet.start();
  }

  const state = await Rx.firstValueFrom(wallet.state());
  logger.info(`Your wallet seed is: ${seed}`);
  logger.info(`Your wallet address is: ${state.address}`);
  let balance = state.balances[nativeToken()];
  if (balance === undefined || balance === 0n) {
    logger.info(`Your wallet balance is: 0`);
    logger.info(`Waiting to receive tokens...`);
    balance = await waitForFunds(wallet);
  }
  logger.info(`Your wallet balance is: ${balance}`);
  return wallet;
};

export const randomBytes = (length: number): Uint8Array => {
  const bytes = new Uint8Array(length);
  webcrypto.getRandomValues(bytes);
  return bytes;
};

export const configureProviders = async (
  wallet: Wallet & Resource,
  config: Config
) => {
  const walletAndMidnightProvider =
    await createWalletAndMidnightProvider(wallet);
  return {
    privateStateProvider: levelPrivateStateProvider<
      typeof MidnamesPrivateStateId
    >({
      privateStateStoreName: contractConfig.privateStateStoreName,
    }),
    publicDataProvider: indexerPublicDataProvider(
      config.indexer,
      config.indexerWS
    ),
    zkConfigProvider: new NodeZkConfigProvider<MidnamesCircuits>(
      contractConfig.zkConfigPath
    ),
    proofProvider: httpClientProofProvider(config.proofServer),
    walletProvider: walletAndMidnightProvider,
    midnightProvider: walletAndMidnightProvider,
  };
};

export function setLogger(_logger: Logger) {
  logger = _logger;
}

export const buildFreshWallet = async (
  config: Config
): Promise<Wallet & Resource> => {
  const seed = toHex(randomBytes(32));
  logger.info(`Building fresh wallet with generated seed...`);
  const filename = `midnames-wallet-fresh.json`;
  return await buildWalletAndWaitForFunds(config, seed, filename);
};


const createDefaultContext = () => ({
  uri: "",
});

const createDefaultVerificationMethod = (): any => ({
  id: "",
  type: "",
  key: {
    is_left: true,
    left: { hex: new Uint8Array(130) },
    right: { address: new Uint8Array(104) },
  },
  controller: [
    new Uint8Array(64),
    new Uint8Array(64),
    new Uint8Array(64),
    new Uint8Array(64),
    new Uint8Array(64),
  ],
  OtherKeys: { is_some: false, value: [["", ""]] },
});

const createDefaultAuthenticationMethod = (): any => ({
  is_left: true,
  left: "",
  right: createDefaultVerificationMethod(),
});

const createDefaultService = (): any => ({
  id: "",
  type: "",
  serviceEndpoint: "",
  OtherKeys: { is_some: false, value: [["", ""]] },
});

const createDefaultCredential = (): any => ({
  data: "",
  publicKeyMultibase: "",
});

export const createDidFromDocument = async (
  midnamesContract: DeployedMidnamesContract,
  didDocument: DidJsonDocument,
  providers?: MidnamesProviders,
  customPrivateKey?: Uint8Array,
  multipleLocalSecretKeys?: Uint8Array[]
): Promise<{ txId: string; didId: string }> => {
  logger.info(`Creating DID from document: ${didDocument.id}`);

  try {
    const didIdBytes = stringToUint8Array(didDocument.id, 64);

    const contextArray = didDocument.context ||
      didDocument["@context"] || ["https://www.w3.org/ns/did/v1"];
    const context = contextArray.map((ctx) => ({
      uri: ctx,
    }));

    const verificationMethods = didDocument.verificationMethod?.map(
      (vm, index) => {
        let key: {
          is_left: boolean;
          left: { hex: Uint8Array };
          right: { address: Uint8Array };
        };
        if (vm.publicKeyHex) {
          key = {
            is_left: true,
            left: { hex: parsePublicKeyHex(vm.publicKeyHex) },
            right: { address: new Uint8Array(104) },
          };
        } else if (vm.AdaAddress) {
          key = {
            is_left: false,
            left: { hex: new Uint8Array(130) },
            right: { address: parseAdaAddress(vm.AdaAddress) },
          };
        } else {
          key = {
            is_left: true,
            left: { hex: new Uint8Array(130) },
            right: { address: new Uint8Array(104) },
          };
        }

        return {
          id: vm.id.split("#")[1] || `keys-${index + 1}`,
          type: vm.type || "BIP32-Ed25519",
          key,
          controller: toControllerVector(vm.controller || didDocument.id),
          OtherKeys: { is_some: false, value: [["key1", "key2"]] },
        };
      }
    ) || [createDefaultVerificationMethod()];

    const authenticationMethods = didDocument.authentication?.map((auth) => {
      if (typeof auth === "string") {
        return {
          is_left: true,
          left: auth.split("#")[1] || "keys-1",
          right: createDefaultVerificationMethod(),
        };
      } else {
        return {
          is_left: false,
          left: "",
          right: {
            id: auth.id.split("#")[1] || "auth-1",
            type: auth.type || "BIP32-Ed25519",
            key: auth.publicKeyHex ? {
              is_left: true,
              left: { hex: parsePublicKeyHex(auth.publicKeyHex) },
              right: { address: new Uint8Array(104) },
            } : auth.publicKeyMultibase ? {
              is_left: true,
              left: { hex: parsePublicKeyHex(auth.publicKeyMultibase) },
              right: { address: new Uint8Array(104) },
            } : auth.AdaAddress ? {
              is_left: false,
              left: { hex: new Uint8Array(130) },
              right: { address: parseAdaAddress(auth.AdaAddress) },
            } : {
              is_left: true,
              left: { hex: new Uint8Array(130) },
              right: { address: new Uint8Array(104) },
            },
            controller: toControllerVector(auth.controller || didDocument.id),
            OtherKeys: { is_some: false, value: [["key1", "key2"]] },
          },
        };
      }
    }) || [createDefaultAuthenticationMethod()];


    

    const services = didDocument.service?.map((svc) => ({
      id: svc.id?.split("#")[1] || "default-service",
      type: svc.type || "DefaultService",
      serviceEndpoint: svc.serviceEndpoint || "https://example.com",
      OtherKeys: { is_some: false, value: [["key1", "key2"]] },
    })) || [createDefaultService()];

    const credentials = didDocument.credentials?.map((cred) => ({
      data: cred.data || "default-credential-data",
      publicKeyMultibase: cred.publicKeyMultibase || "default-key",
    })) || [createDefaultCredential()];

    const authorizedPublicAddresses: Uint8Array[] = [];

    logger.info("Generating proof and creating DID transaction...");

    if (providers && customPrivateKey && multipleLocalSecretKeys) {
      // Use custom private key provided by user
      if (multipleLocalSecretKeys.length > 0) {
        logger.info(
          `Using ${multipleLocalSecretKeys.length} additional secret keys`
        );
      }

      // push to multipleLocalSecretKeys until len 5
      const mlsk = [...multipleLocalSecretKeys];
      while (mlsk.length < 5) {
        mlsk.push(new Uint8Array(32));
      }

      const customPrivateState = createMidnamesSecretState(
        customPrivateKey,
        mlsk
      );
      await providers.privateStateProvider.set(
        MidnamesPrivateStateId,
        customPrivateState
      );
      logger.info("Using custom private key for witness");
    } else if (providers) {
      const currentPrivateState = await providers.privateStateProvider.get(
        MidnamesPrivateStateId
      );
      if (currentPrivateState) {
        logger.info("Using existing private state with deployment keys");
      } else {
        logger.error(
          "No private state found - this should not happen after deployment"
        );
      }
    }

    const finalAuthMethods =
      authenticationMethods.length > 0 ? authenticationMethods : [];
    const finalVerificationMethods =
      verificationMethods.length > 0 ? verificationMethods : [];
    const finalServices = services.length > 0 ? services : [];
    const finalCredentials = credentials.length > 0 ? credentials : [];
    const finalContext = context.length > 0 ? context : [];
    const finalAuthorizedAddresses = authorizedPublicAddresses;

    const authVector = toVector5Maybes(
      finalAuthMethods,
      createDefaultAuthenticationMethod()
    );
    const verificationVector = toVector5Maybes(
      finalVerificationMethods,
      createDefaultVerificationMethod()
    );
    const serviceVector = toVector5Maybes(
      finalServices,
      createDefaultService()
    );
    const credentialVector = toVector5Maybes(
      finalCredentials,
      createDefaultCredential()
    );
    const contextVector = toVector5Maybes(finalContext, createDefaultContext());
    const addressVector = toVector5Maybes(
      finalAuthorizedAddresses,
      new Uint8Array(32)
    );

    const finalizedTxData = await midnamesContract.callTx.create_did(
      didIdBytes,
      authVector,
      verificationVector,
      serviceVector,
      credentialVector,
      contextVector,
      addressVector
    );

    logger.info(
      `Transaction ${finalizedTxData.public.txId} added in block ${finalizedTxData.public.blockHeight}`
    );

    return {
      txId: finalizedTxData.public.txId,
      didId: didDocument.id,
    };
  } catch (error) {
    logger.error(`Failed to create DID from document: ${error}`);
    throw new Error(`DID creation failed: ${error}`);
  }
};
