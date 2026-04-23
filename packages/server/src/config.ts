import path from "node:path";
import { fileURLToPath } from "node:url";

export interface Config {
  readonly indexer: string;
  readonly indexerWS: string;
  readonly node: string;
  readonly proofServer: string;
  readonly networkId: string;
}

export interface FullConfig extends Config {
  readonly walletSeed: string;
  readonly zkConfigPath: string;
  readonly privateStateStoreName: string;
}

export function loadConfig(): FullConfig {
  const walletSeed = process.env.MIDNIGHT_WALLET_SEED;
  if (!walletSeed) throw new Error("MIDNIGHT_WALLET_SEED environment variable is required");

  const thisDir = path.dirname(fileURLToPath(import.meta.url));
  const zkConfigPath = path.resolve(thisDir, "managed", "did");

  return {
    walletSeed,
    zkConfigPath,
    privateStateStoreName: "did-private-state",
    indexer:
      process.env.MIDNIGHT_INDEXER_URL ??
      "https://indexer.preprod.midnight.network/api/v3/graphql",
    indexerWS:
      process.env.MIDNIGHT_INDEXER_WS_URL ??
      "wss://indexer.preprod.midnight.network/api/v3/graphql/ws",
    node: process.env.MIDNIGHT_NODE_URL ?? "https://rpc.preprod.midnight.network",
    proofServer:
      process.env.MIDNIGHT_PROOF_SERVER_URL ?? "http://localhost:6300",
    networkId: process.env.MIDNIGHT_NETWORK_ID ?? "preprod",
  };
}
