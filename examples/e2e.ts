/**
 * End-to-end example: full Midnames VC issuance and verification flow.
 *
 * Required env vars:
 *   MIDNIGHT_WALLET_SEED  — hex64 seed for the server wallet
 *   API_KEY               — authenticates /offer
 *   ISSUER_DID            — pre-deployed issuer DID (did:midnight:<network>:<addr>)
 *   ISSUER_SEED           — optional; signing key seed (defaults to MIDNIGHT_WALLET_SEED)
 *
 * Run:
 *   MIDNIGHT_WALLET_SEED=<hex> API_KEY=<secret> ISSUER_DID=did:midnight:... bun run examples/e2e.ts
 */

import { randomBytes } from "node:crypto";
import { startMidnamesServer } from "@midnames/server";
import { createIssuerKeyPair, signP256, CryptoPrimitives, parseUncompressedKey } from "@midnames/sdk";

const PORT = Number(process.env.PORT ?? 3000);
const BASE = `http://localhost:${PORT}`;
const API_KEY = process.env.API_KEY;
const ISSUER_DID = process.env.ISSUER_DID;
const ISSUER_SEED = process.env.ISSUER_SEED ?? process.env.MIDNIGHT_WALLET_SEED;

if (!API_KEY) throw new Error("API_KEY is required");
if (!ISSUER_DID) throw new Error("ISSUER_DID is required");

type DiplomaSubject = {
  studentName: string;
  degree: string;
  institution: string;
  graduationYear: number;
  id: string;
};

// ── Start server ─────────────────────────────────────────────────────────────

const handle = await startMidnamesServer<DiplomaSubject>({
  credentialType: ["VerifiableCredential", "UniversityDegree"],
  validateSubject: (raw) => {
    const r = raw as Record<string, unknown>;
    if (!r.studentName || !r.degree || !r.institution || !r.graduationYear) {
      throw new Error("Invalid diploma data");
    }
    return r as unknown as DiplomaSubject;
  },
  buildCredential: (subject, holderDid) => ({ ...subject, id: holderDid }),
  onIssued: async (vc) => {
    console.log(`  → onIssued hook: credential ${vc.id} issued to ${vc.credentialSubject.id}`);
  },
});

console.log(`Server running on port ${handle.port}`);

// ── HTTP helper ───────────────────────────────────────────────────────────────

async function post(path: string, body: unknown, auth = false): Promise<Record<string, unknown>> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (auth) headers["Authorization"] = `Bearer ${API_KEY}`;
  const res = await fetch(`${BASE}${path}`, { method: "POST", headers, body: JSON.stringify(body) });
  return res.json() as Promise<Record<string, unknown>>;
}

// ── Step 1: Create credential offer ──────────────────────────────────────────

console.log("\n[1] Creating credential offer...");
const offerRes = await post(
  "/offer",
  {
    issuerDid: ISSUER_DID,
    issuerSeed: ISSUER_SEED,
    issuerName: "Example University",
    credential: {
      studentName: "Alice",
      degree: "Computer Science",
      institution: "Example University",
      graduationYear: 2024,
    },
  },
  true,
);

if (offerRes.error) throw new Error(`/offer failed: ${offerRes.error}\n${JSON.stringify(offerRes.details ?? offerRes, null, 2)}`);
const offer = offerRes.offer as Record<string, unknown>;
const grants = offer.grants as Record<string, Record<string, string>>;
const sessionId = grants["urn:ietf:params:oauth:grant-type:pre-authorized_code"]["pre-authorized_code"];
console.log(`  sessionId: ${sessionId}`);
console.log(`  claimUrl:  ${offerRes.claimUrl}`);

// ── Step 2: Fetch the offer (wallet-side claim) ───────────────────────────────

console.log("\n[2] Fetching offer details...");
const claimRes = await fetch(`${BASE}/claim/${sessionId}`).then((r) => r.json() as Promise<Record<string, unknown>>);
if (claimRes.error) throw new Error(`/claim failed: ${claimRes.error}`);
console.log(`  credential_types: ${JSON.stringify(claimRes.credential_types)}`);
console.log(`  authRequired:     ${claimRes.authRequired}`);

// ── Step 3: Generate holder key pair and commitment ───────────────────────────

console.log("\n[3] Generating holder P-256 key pair...");
// BLS12-381 scalar field modulus — both x and y must be < this to fit in a Compact Field
const BLS_FIELD_MAX = 0x73eda753299d7d483339d80809a1d80553bda402fffe5bfeffffffff00000001n;
let holderPrivKey: Uint8Array, pubKeyRaw: string, holderXY: { x: string; y: string };
let attempts = 0;
do {
  attempts += 1;
  ({ privKey: holderPrivKey, pubKeyRaw } = await createIssuerKeyPair()); // random ephemeral key
  holderXY = parseUncompressedKey(pubKeyRaw);
} while (
  attempts < 100 &&
  (BigInt("0x" + holderXY.x) >= BLS_FIELD_MAX || BigInt("0x" + holderXY.y) >= BLS_FIELD_MAX)
);
if (BigInt("0x" + holderXY.x) >= BLS_FIELD_MAX || BigInt("0x" + holderXY.y) >= BLS_FIELD_MAX) {
  throw new Error("Could not generate a P-256 key with x,y in BLS12-381 scalar field after 100 attempts");
}
console.log(`  generated in ${attempts} attempt(s)`);
const ownerSecret = randomBytes(32).toString("hex");
const holderCommitment = CryptoPrimitives.ComputeCommitment(
  ownerSecret,
  CryptoPrimitives.hexToBytes(holderXY.x),
  CryptoPrimitives.hexToBytes(holderXY.y),
);
console.log(`  pubKey (x): ${holderXY.x.slice(0, 16)}...`);
console.log(`  commitment: ${holderCommitment.slice(0, 16)}...`);

// ── Step 4: Acknowledge (deploys holder DID on-chain) ─────────────────────────

console.log("\n[4] Acknowledging offer (deploys holder DID on-chain)...");
const ackRes = await post("/ack", {
  preAuthorizedCode: sessionId,
  holderCommitment,
  holderPublicKey: pubKeyRaw,
});
if (ackRes.error) throw new Error(`/ack failed: ${ackRes.error}`);
const holderDid = ackRes.holderDid as string;
console.log(`  holderDid: ${holderDid}`);

// ── Step 5: Issue the credential ──────────────────────────────────────────────

console.log("\n[5] Issuing credential...");
const issueRes = await post("/issue", { sessionId, holderCommitment });
if (issueRes.error) throw new Error(`/issue failed: ${issueRes.error}`);
const vc = issueRes.verifiableCredential as Record<string, unknown>;
console.log(`  credential id:   ${vc.id}`);
console.log(`  proof type:      ${(vc.proof as any)?.type}`);
console.log(`  proof method:    ${(vc.proof as any)?.verificationMethod}`);

// ── Step 6: Verify the credential ─────────────────────────────────────────────

console.log("\n[6] Verifying credential...");
const verifyRes = await post("/verify", vc);
console.log(`  verified: ${verifyRes.verified}  status: ${verifyRes.status}`);
if (!verifyRes.verified) console.error(`  error: ${verifyRes.error}`);

// ── Step 7: Get a challenge nonce ─────────────────────────────────────────────

console.log("\n[7] Requesting challenge...");
const challengeRes = await post("/challenge", {});
const challenge = challengeRes.challenge as string;
console.log(`  challenge: ${challenge}`);

// ── Step 8: Build and sign a Verifiable Presentation ─────────────────────────

console.log("\n[8] Building and signing Verifiable Presentation...");
const vpMsg = new TextEncoder().encode(challenge + (vc.id ?? ""));
const vpSig = signP256(holderPrivKey, vpMsg);
const vpProofValue = Buffer.from(vpSig).toString("base64");

const vp = {
  type: "VerifiablePresentation",
  verifiableCredential: [vc],
  holder: holderDid,
  proof: {
    type: "DataIntegrityProof",
    challenge,
    created: new Date().toISOString(),
    proofValue: vpProofValue,
  },
};

// ── Step 9: Verify the presentation ───────────────────────────────────────────

console.log("\n[9] Verifying presentation...");
const vpRes = await post("/verify-presentation", vp);
console.log(`  verified: ${vpRes.verified}  status: ${vpRes.status}`);
if (!vpRes.verified) console.error(`  error: ${vpRes.error}\n${JSON.stringify(vpRes.details ?? vpRes, null, 2)}`);

// ── Done ──────────────────────────────────────────────────────────────────────

console.log("\nStopping server...");
await handle.stop();
console.log("Done.");
