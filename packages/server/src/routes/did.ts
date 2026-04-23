import type { IncomingMessage, ServerResponse } from "node:http";
import { ethers } from "ethers";
import { logger } from "../logger.js";
import * as MidnamesHttp from "../utils/http.js";
import * as MidnamesDid from "../deploy.js";
import { parseUncompressedKey, decodeSignature, buildUncompressedPubKey } from "../crypto.js";
import * as MidnamesStore from "../stores/index.js";
import * as DID from "../managed/did/contract/index.js";
import {
  waitForSync,
  buildCdcvmKeyVerificationMethod,
  createContractInstance,
} from "../providers.js";
import { verifyAndroidAttestation } from "../attestation.js";
import { RebindKeySchema } from "../entities/validator.js";
import type { DidRouteContext } from "./types.js";

let deploying = false;

export function createDidRoutes(ctx: DidRouteContext) {
  return {
    "/deploy": { handler: handleDeploy(ctx), auth: true },
    "/resolve-did": { handler: handleResolveDid(ctx), auth: false },
    "/rebind-key": { handler: handleRebindKey(ctx), auth: false },
  };
}

function handleDeploy(ctx: DidRouteContext) {
  return async (_req: IncomingMessage, res: ServerResponse): Promise<void> => {
    if (deploying) {
      MidnamesHttp.json(res, 409, { error: "A deployment is already in progress" });
      return;
    }
    deploying = true;
    try {
      await waitForSync(ctx.walletContext.wallet);
      const deployed = await MidnamesDid.deployDIDcontract(
        ctx.providers,
        ctx.privateState,
        { x: "0".repeat(64), y: "0".repeat(64) },
        ctx.zkConfigPath,
      );
      MidnamesHttp.json(res, 200, { address: deployed.address });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      logger.error(`Deploy failed: ${message}`);
      MidnamesHttp.json(res, 500, { error: "Deployment failed" });
    } finally {
      deploying = false;
    }
  };
}

function handleResolveDid(ctx: DidRouteContext) {
  return async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
    try {
      const body = await MidnamesHttp.readBody(req);
      const { did } = JSON.parse(body);
      if (!did || typeof did !== "string") {
        MidnamesHttp.json(res, 400, { error: "did is required" });
        return;
      }

      const contractAddress = did.split(":")[3];
      if (!contractAddress) {
        MidnamesHttp.json(res, 400, { error: "Cannot parse contract address from DID" });
        return;
      }

      const state = await ctx.providers.publicDataProvider.queryContractState(contractAddress);
      if (!state || !state.data) {
        MidnamesHttp.json(res, 404, { error: "DID not found on-chain" });
        return;
      }

      const ledgerState = DID.ledger(state.data);
      const keys: Record<string, unknown> = {};
      for (const [id, vm] of ledgerState.verificationMethods) {
        keys[id] = {
          id: vm.id,
          type: vm.typ === 1 ? "JsonWebKey" : "Undefined",
          publicKeyJwk: {
            kty: vm.publicKeyJwk.kty,
            crv: vm.publicKeyJwk.crv === 0 ? "Ed25519" : vm.publicKeyJwk.crv === 1 ? "Jubjub" : "P-256",
            x: vm.publicKeyJwk.x,
            y: vm.publicKeyJwk.y,
          },
        };
      }

      MidnamesHttp.json(res, 200, {
        did,
        active: ledgerState.active,
        deactivated: ledgerState.deactivated,
        verificationMethods: keys,
        hasCdcvmKey: ledgerState.verificationMethods.member("key-1"),
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      logger.error(`Resolve DID failed: ${message}`);
      MidnamesHttp.json(res, 500, { error: "Failed to resolve DID" });
    }
  };
}

function handleRebindKey(ctx: DidRouteContext) {
  return async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
    try {
      const body = await MidnamesHttp.readBody(req);
      const parsed = MidnamesHttp.validateBody(res, RebindKeySchema, JSON.parse(body));
      if (!parsed) return;

      const { holderDid, credentialId, challenge, proof, newCdcvmPublicKey, newCdcvmAttestationChain } = parsed;

      const challengeEntry = MidnamesStore.challengeStore.get(challenge);
      if (!challengeEntry) { MidnamesHttp.json(res, 400, { error: "Unknown or expired challenge" }); return; }
      if (challengeEntry.used) { MidnamesHttp.json(res, 400, { error: "Challenge already used" }); return; }
      challengeEntry.used = true;

      const signedMessage = challenge + credentialId;
      const msgHash = ethers.sha256(new TextEncoder().encode(signedMessage));
      let proofR: string, proofS: string, proofV: number;
      try {
        ({ r: proofR, s: proofS, v: proofV } = decodeSignature(proof));
      } catch (e) {
        MidnamesHttp.json(res, 400, { error: e instanceof Error ? e.message : "Invalid proof signature" });
        return;
      }

      const proofSignature = ethers.Signature.from({ r: proofR, s: proofS, v: proofV });
      const recoveredPubKey = ethers.SigningKey.recoverPublicKey(msgHash, proofSignature);

      const holderContractAddress = holderDid.split(":")[3];
      if (!holderContractAddress) {
        MidnamesHttp.json(res, 400, { error: "Cannot parse holder DID contract address" });
        return;
      }

      const holderState = await ctx.providers.publicDataProvider.queryContractState(holderContractAddress);
      if (!holderState || !holderState.data) {
        MidnamesHttp.json(res, 400, { error: "Failed to resolve holder DID" });
        return;
      }

      const holderContract = DID.ledger(holderState.data);
      const holderKeyJwk = holderContract.verificationMethods.lookup("key-0")?.publicKeyJwk;
      if (!holderKeyJwk) {
        MidnamesHttp.json(res, 400, { error: "Holder public key not found in DID document" });
        return;
      }

      const expectedPubKey = buildUncompressedPubKey(holderKeyJwk);
      if (recoveredPubKey.toLowerCase() !== expectedPubKey.toLowerCase()) {
        MidnamesHttp.json(res, 403, { error: "Proof signature does not match holder DID key-0" });
        return;
      }

      const attestResult = verifyAndroidAttestation(newCdcvmAttestationChain, challenge);
      if (!attestResult.valid) {
        MidnamesHttp.json(res, 400, { error: `New CDCVM attestation failed: ${attestResult.error}` });
        return;
      }
      if (attestResult.publicKey?.toLowerCase() !== newCdcvmPublicKey.toLowerCase()) {
        MidnamesHttp.json(res, 400, { error: "New CDCVM public key does not match attested key" });
        return;
      }

      const newCdcvmXY = parseUncompressedKey(newCdcvmPublicKey);
      const cdcvmVm = buildCdcvmKeyVerificationMethod(newCdcvmXY);
      const hasKey1 = holderContract.verificationMethods.member("key-1");

      const cc = createContractInstance(ctx.zkConfigPath);
      const { findDeployedContract } = await import("@midnight-ntwrk/midnight-js-contracts");
      const joinedContract = await (findDeployedContract as any)(ctx.providers, {
        compiledContract: cc,
        privateStateId: "midnightDIDPrivateState",
        contractAddress: holderContractAddress,
      });

      if (hasKey1) {
        await joinedContract.callTx.updateVerificationMethod(cdcvmVm);
      } else {
        await joinedContract.callTx.addVerificationMethod(cdcvmVm);
      }

      MidnamesStore.cdcvmAttestationStore.set(holderDid, newCdcvmAttestationChain);
      MidnamesHttp.json(res, 200, { success: true, holderDid, cdcvmRebound: true });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      logger.error(`Rebind key failed: ${message}`);
      MidnamesHttp.json(res, 500, { error: "Key rebind failed" });
    }
  };
}
