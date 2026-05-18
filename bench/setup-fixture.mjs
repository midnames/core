/**
 * Issues one real VC against a RUNNING @midnames/vc server and saves the
 * fixture (signed VC + holder private key) that run-bench.mjs replays.
 *
 * The /ack step deploys a holder DID on-chain, so the server needs a funded
 * wallet and a reachable proof server. This script is run once; the fixture
 * is reused across benchmark runs.
 *
 * Env:
 *   BASE_URL    — server under test (default http://localhost:3000)
 *   API_KEY     — bearer token for /offer
 *   ISSUER_DID  — pre-deployed issuer DID (did:midnight:<network>:<addr>)
 *   ISSUER_SEED — signing key seed (defaults to MIDNIGHT_WALLET_SEED)
 *
 * Run:  node bench/setup-fixture.mjs
 */

import { randomBytes } from "node:crypto";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import * as path from "node:path";
import { createIssuerKeyPair, parseUncompressedKey, CryptoPrimitives } from "@midnames/vc/core";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const API_KEY = process.env.API_KEY;
const ISSUER_DID = process.env.ISSUER_DID;
const ISSUER_SEED = process.env.ISSUER_SEED ?? process.env.MIDNIGHT_WALLET_SEED;

if (!API_KEY) throw new Error("API_KEY is required");
if (!ISSUER_DID) throw new Error("ISSUER_DID is required");
if (!ISSUER_SEED) throw new Error("ISSUER_SEED or MIDNIGHT_WALLET_SEED is required");

async function post(route, body, auth = false) {
  const headers = { "Content-Type": "application/json" };
  if (auth) headers["Authorization"] = `Bearer ${API_KEY}`;
  const res = await fetch(`${BASE}${route}`, { method: "POST", headers, body: JSON.stringify(body) });
  return res.json();
}

console.log(`[1/4] Creating offer at ${BASE} ...`);
const offerRes = await post(
  "/offer",
  {
    issuerDid: ISSUER_DID,
    issuerSeed: ISSUER_SEED,
    issuerName: "Bench University",
    credential: {
      studentName: "Bench Holder",
      degree: "Load Testing",
      institution: "Bench University",
      graduationYear: 2026,
    },
  },
  true,
);
if (offerRes.error) throw new Error(`/offer failed: ${offerRes.error}\n${JSON.stringify(offerRes.details ?? offerRes, null, 2)}`);
const sessionId = offerRes.offer.grants["urn:ietf:params:oauth:grant-type:pre-authorized_code"]["pre-authorized_code"];
console.log(`      sessionId: ${sessionId}`);

console.log("[2/4] Generating holder P-256 key (x,y must fit the BLS12-381 scalar field) ...");
const BLS_FIELD_MAX = 0x73eda753299d7d483339d80809a1d80553bda402fffe5bfeffffffff00000001n;
let holderPrivKey, pubKeyRaw, holderXY;
let attempts = 0;
do {
  attempts += 1;
  ({ privKey: holderPrivKey, pubKeyRaw } = await createIssuerKeyPair());
  holderXY = parseUncompressedKey(pubKeyRaw);
} while (
  attempts < 100 &&
  (BigInt("0x" + holderXY.x) >= BLS_FIELD_MAX || BigInt("0x" + holderXY.y) >= BLS_FIELD_MAX)
);
if (BigInt("0x" + holderXY.x) >= BLS_FIELD_MAX || BigInt("0x" + holderXY.y) >= BLS_FIELD_MAX) {
  throw new Error("Could not generate a usable P-256 key after 100 attempts");
}
const ownerSecret = randomBytes(32).toString("hex");
const holderCommitment = CryptoPrimitives.ComputeCommitment(
  ownerSecret,
  CryptoPrimitives.hexToBytes(holderXY.x),
  CryptoPrimitives.hexToBytes(holderXY.y),
);

console.log("[3/4] Acknowledging offer (deploys holder DID on-chain, can take a few minutes) ...");
const ackRes = await post("/ack", { preAuthorizedCode: sessionId, holderCommitment, holderPublicKey: pubKeyRaw });
if (ackRes.error) throw new Error(`/ack failed: ${ackRes.error}`);
const holderDid = ackRes.holderDid;
console.log(`      holderDid: ${holderDid}`);

console.log("[4/4] Issuing credential ...");
const issueRes = await post("/issue", { sessionId, holderCommitment });
if (issueRes.error) throw new Error(`/issue failed: ${issueRes.error}`);
const vc = issueRes.verifiableCredential;
console.log(`      credential id: ${vc.id}`);

const verifyRes = await post("/verify", vc);
if (!verifyRes.verified) throw new Error(`Sanity /verify failed: ${verifyRes.error}`);
console.log("      sanity /verify: verified");

const outPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "fixture.json");
writeFileSync(
  outPath,
  JSON.stringify(
    {
      createdAt: new Date().toISOString(),
      baseUrl: BASE,
      issuerDid: ISSUER_DID,
      holderDid,
      holderPrivKeyHex: Buffer.from(holderPrivKey).toString("hex"),
      holderPubKeyRaw: pubKeyRaw,
      ownerSecret,
      vc,
    },
    null,
    2,
  ),
);
console.log(`\nFixture written to ${outPath}`);
console.log("NOTE: fixture.json contains the bench holder's private key — do not commit it.");
process.exit(0);
