# M6 load-test harness (`autocannon`)

Produces the numbers for the "Stress Testing & Robustness" section of the M6
deliverable: sustained req/sec on `/verify` and `/verify-presentation` over a
60-second window at concurrency 50, with the per-IP rate limiter active.

## How the limiter is handled

The rate limiter keys buckets on the client IP, taking `x-forwarded-for` if
present. Each route's quota (e.g. `/verify` = 30 req/min) means a single-IP
autocannon run measures the *limiter*, not the verification path. So each
route is measured twice:

- **limited** — single client IP. Confirms the limiter trips cleanly:
  per-window quota × 200, everything else 429.
- **throughput** — a unique `x-forwarded-for` per request, so every request
  gets its own bucket and the full verification path runs (revocation-list
  read + DID resolution + P-256 verify).

`/verify-presentation` challenges are single-use, so the throughput scenario
pre-mints challenges via `GET /challenge` and pre-signs one VP per request
with the fixture holder key.

`p256-baseline` measures in-process `verifyP256()` ops/sec — ~552/s/core
(~1.8 ms), i.e. ~16% of the ~11 ms serialized cost of a `/verify` request;
the dominant cost is the two on-chain contract-state resolutions.

## Running (local Midnight environment)

```bash
# 1. local chain: node (dev preset) + indexer + proof server
docker compose -f bench/local-env.yml up -d

# 2. fund the bench wallet from genesis & register dust
#    (tool lives in ~/midnames/midnight-local-network)
cd ~/midnames/midnight-local-network && \
  yarn fund-and-register-dust "$(grep MIDNIGHT_WALLET_SEED ~/midnames/core/bench/local.env | cut -d'"' -f2)"

# 3. deploy the issuer DID (writes ~/.midnames-wallet-cache.json for fast restarts)
cd ~/midnames/core
set -a; . bench/local.env; set +a
node examples/deploy-issuer.ts        # prints did:midnight:undeployed:<addr> → bench/issuer-did.txt

# 4. start the server under test (first start deploys the revocation contract;
#    its address is appended to bench/local.env as MIDNIGHT_REVOCATION_CONTRACT_ADDRESS)
node examples/diploma-server.ts

# 5. one-time: issue the fixture VC (deploys a holder DID on-chain)
ISSUER_DID="$(cat bench/issuer-did.txt)" node bench/setup-fixture.mjs

# 6. run all scenarios (~5 min)
node bench/run-bench.mjs
```

Knobs: `BENCH_DURATION` (60), `BENCH_CONNECTIONS` (50), `BENCH_VP_POOL`
(12000 pre-minted challenges), `BENCH_SCENARIOS` (comma-separated subset of
`p256-baseline,verify-limited,verify-throughput,vp-limited,vp-throughput`).

Output: `bench/results.json` + console summary.

Notes:

- The bench mnemonic in `local.env` is chosen so the HKDF-derived issuer
  P-256 key has x,y inside the BLS12-381 scalar field (`deployDid` requires
  it; ~20% of random seeds qualify).
- `~/.midnames-wallet-cache.json` is keyed to a single wallet — delete it
  when switching seeds or networks.
- `fixture.json` contains the bench holder's private key — gitignored.
- As of 2026-06-11, preprod wallet sync is broken for this repo's wallet-SDK
  line (dust-wallet WASM `unreachable` applying sync events ~id 570k, even
  on the latest published SDK and with a fresh wallet) — hence the local
  environment, which the deliverable calls for anyway.
- `bootstrap-local-wallet.mjs` is a fallback dust-registration script; the
  `fund-and-register-dust` tool above already does both steps.
