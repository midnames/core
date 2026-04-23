import { createIssuerKeyPair, parseUncompressedKey } from "@midnames/sdk";
import { logger } from "./logger.js";
import {
  buildWalletAndWaitForFunds,
  closeWallet,
  configureProviders,
  createContractInstance,
  deploy,
  initPrivateState,
  type WalletContext,
} from "./providers.js";
import { loadConfig } from "./config.js";

export async function deployDid(): Promise<string> {
  const config = loadConfig();
  const seed = config.walletSeed;
  if (!seed) throw new Error("MIDNIGHT_WALLET_SEED is required");

  const { pubKeyRaw } = await createIssuerKeyPair(seed);
  const issuerKeyXY = parseUncompressedKey(pubKeyRaw);

  let walletContext: WalletContext | undefined;
  try {
    walletContext = await buildWalletAndWaitForFunds(config, seed);
    const providers = await configureProviders(walletContext, config);
    const privateState = await initPrivateState(providers);
    const compiledContract = createContractInstance(config.zkConfigPath);
    const didContract = await deploy(providers, compiledContract, privateState, issuerKeyXY);
    const contractAddress = didContract.deployTxData.public.contractAddress;
    const did = `did:midnight:${config.networkId}:${contractAddress}`;
    logger.info(`DID deployed: ${did}`);
    return did;
  } finally {
    if (walletContext) await closeWallet(walletContext);
  }
}

export async function deployDIDcontract(
  providers: any,
  privateState: any,
  holderKey: { x: string; y: string },
  zkConfigPath: string,
  cdcvmKey?: { x: string; y: string },
): Promise<{ address: string; contract: any }> {
  const cc = createContractInstance(zkConfigPath);
  const didContract = await deploy(providers, cc, privateState, holderKey, cdcvmKey);
  const contractAddress = didContract.deployTxData.public.contractAddress;
  return { address: contractAddress, contract: didContract };
}
