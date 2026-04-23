import type { IncomingMessage, ServerResponse } from "node:http";
import { webcrypto } from "node:crypto";
import { logger } from "../logger.js";
import { RevokeCredentialSchema } from "../entities/validator.js";
import * as MidnamesHttp from "../utils/http.js";
import { ledger } from "../managed/revocation-list/contract/index.js";
import type { RevocationRouteContext } from "./types.js";

export function createRevocationRoutes(ctx: RevocationRouteContext) {
  return {
    "/revoke": { handler: handleRevoke(ctx), auth: true },
    "/revocation-status": { handler: handleRevocationStatus(ctx), auth: false },
  };
}

async function hashCredentialId(credentialId: string): Promise<Uint8Array> {
  const data = new TextEncoder().encode(credentialId);
  const hashBuffer = await webcrypto.subtle.digest("SHA-256", data);
  return new Uint8Array(hashBuffer);
}

function handleRevoke(ctx: RevocationRouteContext) {
  return async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
    try {
      const parsed = MidnamesHttp.validateBody(res, RevokeCredentialSchema, JSON.parse(await MidnamesHttp.readBody(req)));
      if (!parsed) return;

      const { credentialId } = parsed;
      const credentialIdHash = await hashCredentialId(credentialId);

      const contractState = await ctx.providers.publicDataProvider.queryContractState(ctx.revocationAddress);
      if (!contractState || !contractState.data) throw new Error("Failed to query revocation contract state");

      const revocationLedger = ledger(contractState.data);
      if (revocationLedger.revocationList.member(credentialIdHash)) {
        MidnamesHttp.json(res, 409, { error: "Credential already revoked", credentialId });
        return;
      }

      await ctx.waitForSync();
      logger.info(`Revoking credential: ${credentialId}`);
      const txResult = await ctx.revocationContract.callTx.revokeCredential(credentialIdHash);

      logger.info(`Credential revoked: ${credentialId}, tx: ${txResult.public.txId}`);
      MidnamesHttp.json(res, 200, {
        success: true,
        credentialId,
        transactionId: txResult.public.txId,
        revocationListAddress: ctx.revocationAddress,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      logger.error(`Revocation failed: ${message}`);
      if (message.includes("already revoked")) {
        MidnamesHttp.json(res, 409, { error: "Credential already revoked" });
      } else {
        MidnamesHttp.json(res, 500, { error: "Failed to revoke credential" });
      }
    }
  };
}

function handleRevocationStatus(ctx: RevocationRouteContext) {
  return async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
    try {
      const parsed = MidnamesHttp.validateBody(res, RevokeCredentialSchema, JSON.parse(await MidnamesHttp.readBody(req)));
      if (!parsed) return;

      const { credentialId } = parsed;
      const credentialIdHash = await hashCredentialId(credentialId);

      const contractState = await ctx.providers.publicDataProvider.queryContractState(ctx.revocationAddress);
      if (!contractState || !contractState.data) throw new Error("Failed to query revocation contract state");

      const revocationLedger = ledger(contractState.data);
      const isRevoked = revocationLedger.revocationList.member(credentialIdHash);
      const totalRevocations = revocationLedger.revocations;

      MidnamesHttp.json(res, 200, {
        credentialId,
        isRevoked,
        revocationListAddress: ctx.revocationAddress,
        totalRevocations: totalRevocations.toString(),
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      logger.error(`Revocation status check failed: ${message}`);
      MidnamesHttp.json(res, 500, { error: "Failed to check revocation status" });
    }
  };
}
