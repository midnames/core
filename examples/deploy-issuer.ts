/**
 * Deploy an issuer DID whose `key-0` is the P-256 key derived from MIDNIGHT_WALLET_SEED.
 * The printed DID is the value you plug into ISSUER_DID for e2e.ts.
 *
 * Run:
 *   MIDNIGHT_WALLET_SEED=<hex|mnemonic> bun run examples/deploy-issuer.ts
 *   LOG_LEVEL=debug MIDNIGHT_WALLET_SEED=<…> bun run examples/deploy-issuer.ts   # verbose
 */

import { deployDid } from "@midnames/vc/server";

const start = Date.now();
const heartbeat = setInterval(() => {
  const elapsed = Math.round((Date.now() - start) / 1000);
  console.log(`… still working (${elapsed}s). Preprod sync + waiting for funds can take a few minutes.`);
}, 15_000);

try {
  const did = await deployDid();
  clearInterval(heartbeat);
  console.log(did);
} catch (err) {
  clearInterval(heartbeat);
  throw err;
}
