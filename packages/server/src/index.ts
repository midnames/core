import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { networkInterfaces } from "node:os";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

import { logger } from "./logger.js";
import { loadConfig } from "./config.js";
import {
  buildWalletAndWaitForFunds,
  closeWallet,
  configureProviders,
  deployRevocationListContract,
  findRevocationListContract,
  initPrivateState,
  waitForSync,
  type WalletContext,
} from "./providers.js";
import type { MidnightDIDProviders } from "./types.js";
import type { MidnightDIDPrivateState } from "./witnesses.js";

import * as MidnamesServerConstants from "./constants.js";
import * as MidnamesHttp from "./utils/http.js";
import * as MidnamesStore from "./stores/index.js";

import { createCredentialRoutes, getHandleClaim } from "./routes/credential.js";
import { createVerificationRoutes } from "./routes/verification.js";
import { createDidRoutes } from "./routes/did.js";
import { createRevocationRoutes } from "./routes/revocation.js";
import type { CredentialRouteContext, DidRouteContext, RevocationRouteContext, VerificationRouteContext } from "./routes/types.js";
import type { VerifiableCredential } from "@midnames/sdk";

// ============================================================================
// Public API types
// ============================================================================

export interface MidnamesServerConfig<TSubject> {
  credentialType: string[];
  validateSubject: (raw: unknown) => TSubject;
  buildCredential: (subject: TSubject, holderDid: string, issuerDid: string) => TSubject & { id: string };
  onIssued?: (credential: VerifiableCredential<TSubject>) => Promise<void> | void;
}

export interface MidnamesServerHandle {
  port: number;
  stop: () => Promise<void>;
}

// ============================================================================
// Re-exports for consumers
// ============================================================================

export type { MidnightDIDProviders } from "./types.js";
export type { MidnightDIDPrivateState } from "./witnesses.js";
export type { WalletContext } from "./providers.js";
export type { CredentialRouteContext, DidRouteContext, RevocationRouteContext, VerificationRouteContext } from "./routes/types.js";
export { loadConfig } from "./config.js";
export type { Config, FullConfig } from "./config.js";
export { verifyCredentialSignature, isRevoked } from "./routes/verification.js";
export { issueCredential } from "./handlers/issueCredential.js";
export { deployDid } from "./deploy.js";

// ============================================================================
// Rate limits (requests per minute per IP)
// ============================================================================

const RATE_LIMITS: Record<string, number> = {
  "/ack": 10,
  "/issue": 10,
  "/verify": 30,
  "/challenge": 30,
  "/verify-presentation": 30,
  "/verify-batch": 10,
  "/rebind-key": 5,
  "/claim/": 20,
  "/revoke": 10,
  "/revocation-status": 30,
};

// ============================================================================
// startMidnamesServer
// ============================================================================

export async function startMidnamesServer<TSubject>(
  credentialConfig: MidnamesServerConfig<TSubject>,
): Promise<MidnamesServerHandle> {
  if (!MidnamesServerConstants.API_KEY) {
    throw new Error("API_KEY environment variable is required");
  }

  const config = loadConfig();
  const seed = config.walletSeed;
  if (!seed) throw new Error("MIDNIGHT_WALLET_SEED is required");

  logger.info("Building wallet and waiting for funds...");
  const walletContext: WalletContext = await buildWalletAndWaitForFunds(config, seed);

  logger.info("Configuring providers...");
  const providers: MidnightDIDProviders = await configureProviders(walletContext, config);

  logger.info("Initializing private state...");
  const privateState: MidnightDIDPrivateState = await initPrivateState(providers);

  const thisDir = path.dirname(fileURLToPath(import.meta.url));
  const revocationZkConfigPath = path.resolve(thisDir, "managed", "revocation-list");
  const revocationResult = config.revocationContractAddress
    ? await findRevocationListContract(
        providers,
        revocationZkConfigPath,
        config.proofServer,
        config.revocationContractAddress,
      )
    : await deployRevocationListContract(providers, revocationZkConfigPath, config.proofServer);
  const revocationContract = revocationResult.contract;
  const revocationAddress = revocationResult.address;
  if (!config.revocationContractAddress) {
    logger.info(
      `Set MIDNIGHT_REVOCATION_CONTRACT_ADDRESS=${revocationAddress} on the next start to reuse this contract.`,
    );
  }

  logger.info("Wallet synced and ready.");

  // ============================================================================
  // Route contexts
  // ============================================================================

  const credentialCtx: CredentialRouteContext<TSubject> = {
    providers,
    privateState,
    zkConfigPath: config.zkConfigPath,
    networkId: config.networkId,
    waitForSync: async () => { await waitForSync(walletContext.wallet); },
    credentialType: credentialConfig.credentialType,
    validateSubject: credentialConfig.validateSubject,
    buildCredential: credentialConfig.buildCredential,
    onIssued: credentialConfig.onIssued,
  };

  const didCtx: DidRouteContext = {
    providers,
    privateState,
    walletContext,
    zkConfigPath: config.zkConfigPath,
  };

  const verificationCtx: VerificationRouteContext = { providers, revocationAddress };

  const revocationCtx: RevocationRouteContext = {
    providers,
    revocationContract,
    revocationAddress,
    waitForSync: async () => { await waitForSync(walletContext.wallet); },
  };

  // ============================================================================
  // Merge routes
  // ============================================================================

  const credentialRoutes = createCredentialRoutes<TSubject>(credentialCtx);
  const didRoutes = createDidRoutes(didCtx);
  const verificationRoutes = createVerificationRoutes(verificationCtx);
  const revocationRoutes = createRevocationRoutes(revocationCtx);

  const { _sessionStore, ...credentialRoutesOnly } = credentialRoutes;
  const handleClaim = getHandleClaim<TSubject>(credentialCtx, _sessionStore);

  type RouteHandler = (req: IncomingMessage, res: ServerResponse) => Promise<void>;
  const routes: Record<string, { handler: RouteHandler; auth: boolean }> = {
    ...credentialRoutesOnly,
    ...didRoutes,
    ...verificationRoutes,
    ...revocationRoutes,
  };

  // ============================================================================
  // Request handler
  // ============================================================================

  async function handleRequest(req: IncomingMessage, res: ServerResponse): Promise<void> {
    logger.debug(`${req.method} ${req.url}`);
    MidnamesHttp.setCorsHeaders(res);

    if (req.method === "OPTIONS") {
      res.writeHead(204);
      res.end();
      return;
    }

    const url = req.url ?? "";

    const clientIp =
      (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
      req.socket.remoteAddress ||
      "unknown";
    const rateLimitRoute = url.startsWith("/claim/") ? "/claim/" : url;
    const maxReqs = RATE_LIMITS[rateLimitRoute];
    if (maxReqs && MidnamesStore.isRateLimited(clientIp, maxReqs)) {
      res.setHeader("Retry-After", "60");
      MidnamesHttp.json(res, 429, { error: "Too many requests, please try again later" });
      return;
    }

    if (req.method === "GET" && url.startsWith("/claim/")) {
      const nonce = url.slice("/claim/".length);
      if (!nonce) { MidnamesHttp.json(res, 400, { error: "Missing nonce" }); return; }
      await handleClaim(req, res, nonce);
      return;
    }

    if (req.method === "POST") {
      const ct = req.headers["content-type"];
      if (!ct || !ct.includes("application/json")) {
        MidnamesHttp.json(res, 415, { error: "Content-Type must be application/json" });
        return;
      }
    }

    if (req.method !== "POST") {
      MidnamesHttp.json(res, 404, { error: "Not found" });
      return;
    }

    const route = routes[url];
    if (!route) { MidnamesHttp.json(res, 404, { error: "Not found" }); return; }
    if (route.auth && !MidnamesHttp.requireAuth(req, res)) return;

    await route.handler(req, res);
  }

  // ============================================================================
  // HTTP server lifecycle
  // ============================================================================

  const server = createServer(handleRequest);

  await new Promise<void>((resolve) => {
    server.listen(MidnamesServerConstants.PORT, "0.0.0.0", () => resolve());
  });

  const localIp =
    Object.values(networkInterfaces())
      .flat()
      .find((i) => i && i.family === "IPv4" && !i.internal)?.address ?? "unknown";
  logger.info(`Midnames server listening on http://${localIp}:${MidnamesServerConstants.PORT}`);

  const stop = async () => {
    logger.info("Shutting down...");
    await new Promise<void>((resolve) => server.close(() => resolve()));
    await closeWallet(walletContext);
  };

  process.on("SIGINT", () => stop().then(() => process.exit(0)));
  process.on("SIGTERM", () => stop().then(() => process.exit(0)));

  return { port: MidnamesServerConstants.PORT, stop };
}
