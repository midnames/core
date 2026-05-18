/**
 * autocannon benchmark for the M6 deliverable: sustained throughput on
 * /verify and /verify-presentation over a 60 s window at concurrency 50.
 *
 * Scenarios (all run against an already-running server, fixture from setup-fixture.mjs):
 *
 *   p256-baseline      — pure verifyP256() ops/sec in-process (no HTTP), to compare
 *                        against HTTP throughput: is the route P-256-bound or not?
 *   verify-limited     — POST /verify, single client IP, limiter active.
 *                        Expected: ~30 × 200/min, everything else 429.
 *   verify-throughput  — POST /verify, unique x-forwarded-for per request so every
 *                        request lands in its own rate-limit bucket. Measures the
 *                        real verification path (revocation read + DID read + P-256).
 *   vp-limited         — POST /verify-presentation, single IP, one pre-signed VP.
 *                        Shows single-use challenge rejection + limiter trip.
 *   vp-throughput      — POST /verify-presentation, pre-minted challenges and
 *                        pre-signed VPs (one per request), rotating x-forwarded-for.
 *
 * Env:
 *   BASE_URL          — default http://localhost:3000
 *   BENCH_DURATION    — seconds per scenario (default 60)
 *   BENCH_CONNECTIONS — concurrent connections (default 50)
 *   BENCH_VP_POOL     — pre-minted challenge pool size (default 12000)
 *   BENCH_SCENARIOS   — comma-separated subset (default: all)
 *
 * Run:  node bench/run-bench.mjs
 */

import autocannon from "autocannon";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import * as path from "node:path";
import { signP256, verifyP256 } from "@midnames/vc/core";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const DURATION = Number(process.env.BENCH_DURATION ?? 60);
const CONNECTIONS = Number(process.env.BENCH_CONNECTIONS ?? 50);
const VP_POOL = Number(process.env.BENCH_VP_POOL ?? 12000);
const ONLY = process.env.BENCH_SCENARIOS?.split(",").map((s) => s.trim());

const benchDir = path.dirname(fileURLToPath(import.meta.url));
const fixture = JSON.parse(readFileSync(path.join(benchDir, "fixture.json"), "utf-8"));
const vc = fixture.vc;
const holderPrivKey = Buffer.from(fixture.holderPrivKeyHex, "hex");
const vcBody = JSON.stringify(vc);

const results = {};

// ── helpers ──────────────────────────────────────────────────────────────────

let xffCounter = 0;
function nextXff() {
  const n = xffCounter++;
  return `10.${(n >> 16) & 255}.${(n >> 8) & 255}.${n & 255}`;
}

function runCannon({ title, route, body, rotateXff = false, bodyQueue = null }) {
  const statusCounts = {};
  let queueIdx = 0;
  let queueExhausted = 0;

  const reqTemplate = {
    method: "POST",
    path: route,
    headers: { "content-type": "application/json" },
    body,
  };
  if (rotateXff || bodyQueue) {
    reqTemplate.setupRequest = (req) => {
      if (rotateXff) req.headers = { ...req.headers, "x-forwarded-for": nextXff() };
      if (bodyQueue) {
        if (queueIdx >= bodyQueue.length) {
          queueExhausted++;
          req.body = bodyQueue[bodyQueue.length - 1];
        } else {
          req.body = bodyQueue[queueIdx++];
        }
      }
      return req;
    };
  }

  return new Promise((resolve, reject) => {
    const instance = autocannon(
      {
        url: BASE,
        duration: DURATION,
        connections: CONNECTIONS,
        timeout: 30,
        requests: [reqTemplate],
        setupClient: (client) => {
          client.on("response", (statusCode) => {
            statusCounts[statusCode] = (statusCounts[statusCode] ?? 0) + 1;
          });
        },
      },
      (err, result) => {
        if (err) return reject(err);
        resolve({
          title,
          route,
          duration_s: DURATION,
          connections: CONNECTIONS,
          requests_total: result.requests.total,
          rps_avg: result.requests.average,
          throughput_bytes_avg: result.throughput.average,
          latency_ms: {
            avg: result.latency.average,
            p50: result.latency.p50,
            p90: result.latency.p90,
            p97_5: result.latency.p97_5,
            p99: result.latency.p99,
            max: result.latency.max,
          },
          errors: result.errors,
          timeouts: result.timeouts,
          statusCounts,
          vpPoolExhaustedRequests: bodyQueue ? queueExhausted : undefined,
        });
      },
    );
    autocannon.track(instance, { renderResultsTable: false, renderProgressBar: true });
  });
}

async function preflight(route, body, expectVerified) {
  const res = await fetch(`${BASE}${route}`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": `preflight-${route}-${Date.now()}` },
    body,
  });
  const json = await res.json();
  if (expectVerified && json.verified !== true) {
    throw new Error(`Preflight ${route} not verified: ${JSON.stringify(json)}`);
  }
  return json;
}

function makeVpBody(challenge) {
  const msg = new TextEncoder().encode(challenge + (vc.id ?? ""));
  const sig = signP256(holderPrivKey, msg);
  return JSON.stringify({
    type: "VerifiablePresentation",
    verifiableCredential: [vc],
    holder: fixture.holderDid,
    proof: {
      type: "DataIntegrityProof",
      challenge,
      created: new Date().toISOString(),
      proofValue: Buffer.from(sig).toString("base64"),
    },
  });
}

async function mintChallenges(count) {
  console.log(`Minting ${count} challenges (rotating x-forwarded-for) ...`);
  const challenges = [];
  const workers = 64;
  let launched = 0;
  async function worker() {
    while (launched < count) {
      launched++;
      const res = await fetch(`${BASE}/challenge`, {
        headers: { "x-forwarded-for": nextXff() },
      });
      const json = await res.json();
      if (json.challenge) challenges.push(json.challenge);
    }
  }
  const t0 = Date.now();
  await Promise.all(Array.from({ length: workers }, worker));
  console.log(`Minted ${challenges.length} challenges in ${((Date.now() - t0) / 1000).toFixed(1)} s`);
  return challenges;
}

function shouldRun(name) {
  return !ONLY || ONLY.includes(name);
}

// ── scenario: p256-baseline ──────────────────────────────────────────────────

if (shouldRun("p256-baseline")) {
  console.log("\n=== p256-baseline: in-process verifyP256 ops/sec (single core) ===");
  const msg = new TextEncoder().encode(vcBody);
  const sig = signP256(holderPrivKey, msg);
  const pubKeyHex = fixture.holderPubKeyRaw;
  if (!verifyP256(pubKeyHex, sig, msg)) throw new Error("baseline self-check failed");
  // warmup
  for (let i = 0; i < 200; i++) verifyP256(pubKeyHex, sig, msg);
  const t0 = process.hrtime.bigint();
  let n = 0;
  while (process.hrtime.bigint() - t0 < 3_000_000_000n) {
    verifyP256(pubKeyHex, sig, msg);
    n++;
  }
  const elapsed = Number(process.hrtime.bigint() - t0) / 1e9;
  results["p256-baseline"] = {
    title: "in-process verifyP256",
    ops_per_sec_single_core: Math.round(n / elapsed),
    message_bytes: msg.length,
  };
  console.log(`verifyP256: ${results["p256-baseline"].ops_per_sec_single_core} ops/s (msg ${msg.length} B)`);
}

// ── scenario: verify-limited ─────────────────────────────────────────────────

if (shouldRun("verify-limited")) {
  console.log(`\n=== verify-limited: POST /verify, single IP, c=${CONNECTIONS}, ${DURATION}s ===`);
  await preflight("/verify", vcBody, true);
  results["verify-limited"] = await runCannon({ title: "/verify single IP (limiter active)", route: "/verify", body: vcBody });
  console.log(JSON.stringify(results["verify-limited"].statusCounts));
}

// ── scenario: verify-throughput ──────────────────────────────────────────────

if (shouldRun("verify-throughput")) {
  console.log(`\n=== verify-throughput: POST /verify, rotating XFF, c=${CONNECTIONS}, ${DURATION}s ===`);
  await preflight("/verify", vcBody, true);
  results["verify-throughput"] = await runCannon({
    title: "/verify rotating XFF (per-request rate-limit bucket)",
    route: "/verify",
    body: vcBody,
    rotateXff: true,
  });
  console.log(JSON.stringify(results["verify-throughput"].statusCounts));
}

// ── scenario: vp-limited ─────────────────────────────────────────────────────

if (shouldRun("vp-limited")) {
  console.log(`\n=== vp-limited: POST /verify-presentation, single IP, one challenge, c=${CONNECTIONS}, ${DURATION}s ===`);
  const [challenge] = await mintChallenges(1);
  const body = makeVpBody(challenge);
  results["vp-limited"] = await runCannon({
    title: "/verify-presentation single IP, replayed VP (limiter + single-use challenge)",
    route: "/verify-presentation",
    body,
  });
  console.log(JSON.stringify(results["vp-limited"].statusCounts));
}

// ── scenario: vp-throughput ──────────────────────────────────────────────────

if (shouldRun("vp-throughput")) {
  console.log(`\n=== vp-throughput: POST /verify-presentation, fresh challenge per request, rotating XFF, c=${CONNECTIONS}, ${DURATION}s ===`);
  const challenges = await mintChallenges(VP_POOL);
  console.log("Pre-signing VP bodies ...");
  const bodies = challenges.map(makeVpBody);
  await preflight("/verify-presentation", bodies.pop(), true);
  results["vp-throughput"] = await runCannon({
    title: "/verify-presentation rotating XFF, unique challenge per request",
    route: "/verify-presentation",
    bodyQueue: bodies,
    rotateXff: true,
  });
  console.log(JSON.stringify(results["vp-throughput"].statusCounts));
  if (results["vp-throughput"].vpPoolExhaustedRequests > 0) {
    console.warn(
      `WARNING: challenge pool exhausted for ${results["vp-throughput"].vpPoolExhaustedRequests} requests — ` +
        `re-run with BENCH_VP_POOL > ${VP_POOL} for clean numbers`,
    );
  }
}

// ── write results ────────────────────────────────────────────────────────────

const out = {
  ranAt: new Date().toISOString(),
  baseUrl: BASE,
  duration_s: DURATION,
  connections: CONNECTIONS,
  node: process.version,
  results,
};
const outPath = path.join(benchDir, "results.json");
writeFileSync(outPath, JSON.stringify(out, null, 2));
console.log(`\nResults written to ${outPath}`);

for (const [name, r] of Object.entries(results)) {
  if (r.rps_avg !== undefined) {
    console.log(
      `${name}: ${r.rps_avg} req/s avg | latency p50 ${r.latency_ms.p50} ms, p97.5 ${r.latency_ms.p97_5} ms, p99 ${r.latency_ms.p99} ms | statuses ${JSON.stringify(r.statusCounts)}`,
    );
  }
}
process.exit(0);
