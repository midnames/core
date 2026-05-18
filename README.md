# Midnames DID-core

W3C-compliant Verifiable Credentials issuance and verification on the Midnight Network.

This repository publishes a single npm package, **`@midnames/vc`**, with two subpath exports that together implement the [Midnight DID method](docs/Midnight_DID_method.md):

- **`@midnames/vc/core`** — framework-agnostic library: P-256 crypto primitives, W3C VC / VP type definitions, the issuance session protocol (`IssuerClient`), and an in-memory session store. No HTTP or blockchain dependencies.
- **`@midnames/vc/server`** — generic HTTP server that wires `@midnames/vc/core` together with the Midnight wallet and DID contracts. Consumers call `startMidnamesServer<TSubject>(config)`; everything else (wallet construction, DID deployment, route handlers, rate limiting, the revocation contract) is internal.

The repository also ships reference examples, a CLI, and a legacy custom DID-registry contract (kept for reference; not part of the v1.0 RC).

## Quick start

### 1. Install

```bash
pnpm add @midnames/vc
```

### 2. Run a minimal issuance + verification server

```ts
import { startMidnamesServer } from "@midnames/vc/server";
import { z } from "zod";

const DiplomaSchema = z.object({
  studentName: z.string().min(1),
  degree: z.string().min(1),
  institution: z.string().min(1),
  graduationYear: z.number().int().min(1900).max(2100),
});

type DiplomaSubject = z.infer<typeof DiplomaSchema> & { id: string };

await startMidnamesServer<DiplomaSubject>({
  credentialType: ["VerifiableCredential", "UniversityDegree"],
});
```

```bash
MIDNIGHT_WALLET_SEED=<64-128 hex> API_KEY=<secret> node server.js
```

On startup the server builds the wallet, waits for funds, deploys the issuer DID, prints the address, and starts the HTTP server on `$PORT` (default `3000`).

A full working example lives in [`examples/diploma-server.ts`](examples/diploma-server.ts); a complete end-to-end smoke (`offer` → `ack` → `issue` → `verify`) lives in [`examples/e2e.ts`](examples/e2e.ts).

## Architecture

### Two-layer design

`@midnames/vc/core` is pure logic — no HTTP, no Midnight runtime dependencies. It exposes:

- P-256 (secp256r1) signing and verification (`@noble/curves/p256`).
- The `IssuerClient` session state machine (offer → ack → issue).
- `InMemorySessionStore` for offer metadata and challenges.
- W3C VC / VP type definitions.
- `CryptoPrimitives` (commitment computation, key derivation).

`@midnames/vc/server` is the wiring layer. It boots a Midnight wallet, deploys (or attaches to) the issuer DID and the revocation contract, mounts every route, enforces rate limits, and exposes a single `MidnamesServerHandle` for graceful shutdown.

### Cryptography

All signatures are **P-256 / secp256r1**, matching the `addVerificationMethod` circuit allowlist on the [official `midnight-did`](https://github.com/midnight-network/midnight-did) contract (`EC + P256`, `EC + Jubjub`, `OKP + Ed25519`). secp256k1 is not used anywhere in the stack.

- **Issuer key** — HKDF-SHA256 from `MIDNIGHT_WALLET_SEED`. Registered as `key-0` on the issuer DID at startup.
- **Holder key** — generated client-side; registered as `key-0` on the holder DID during `/ack`.
- **CDCVM key** — Android hardware-backed P-256 key registered as `key-1` on the holder DID at issuance time.
- **Proof format** — `DataIntegrityProof` / `ecdsa-2019`, with the proof value encoded as a 64-byte compact `[r‖s]` in base64. No recovery bit.
- **Single primitive** — `verifyP256(pubKeyHex, sig, dataBytes)` from `packages/vc/src/core/crypto/primitives.ts` is reused across every flow.

### DID contracts

The server uses the **official `midnight-did` contract** from `midnight-repos/midnight-did/contract/src/did.compact`. It is compiled to TypeScript by `compact compile +0.30.0` during the package's `prebuild` step, with the output landing in `packages/vc/src/server/managed/did/`.

Each holder gets their own deployed DID contract; the issuer has one DID contract deployed at startup via `deployDid()` in `deploy.ts`.

The revocation list lives in [`packages/vc/contracts/revocation-list.compact`](packages/vc/contracts/revocation-list.compact) and is compiled to `packages/vc/src/server/managed/revocation-list/`.

### Issuance flow (offer → ack → issue)

1. **`POST /offer`** (auth-required). Caller provides credential data, `issuerDid`, and `issuerSeed`. The server creates a session in `InMemorySessionStore` and returns a `claimUrl`.
2. **`GET /claim/:nonce`**. Holder fetches the offer metadata: credential types, issuer DID, TTL.
3. **`POST /ack`**. Holder sends their P-256 `holderPublicKey` and `holderCommitment`. The server deploys a fresh DID contract for the holder (on-chain transaction), binds the holder's key as `key-0`, returns the `holderDid`.
4. **`POST /issue`**. Holder submits `sessionId` and `holderCommitment`. The server calls `buildCredential(subject, holderDid, issuerDid)`, signs the VC with `issueCredential()`, and returns the signed credential.

`holderCommitment` is `SHA-256(ownerSecret ‖ pubKeyX ‖ pubKeyY)`, computed by `CryptoPrimitives.ComputeCommitment()`.

### Verification flow

- **`POST /verify`** / **`POST /verify-batch`** — resolves the issuer's DID on-chain, reads `key-0`'s JWK, verifies the credential's P-256 signature, then consults the revocation list.
- **`GET /challenge` → `POST /verify-presentation`** — challenge-nonce anti-replay (5-minute TTL stored in `challengeStore`). The server verifies the credential signature, the holder DID binding, the challenge validity, and optionally a CDCVM signature against `key-1`. Resolves both the issuer DID (for the VC) and the holder DID (for the VP).

On-circuit verification is deferred until the Compact std-lib exposes P-256 primitives; today every signature is verified offchain inside the server process.

### Revocation

The server deploys a `revocation-list.compact` contract on startup. To reuse an existing revocation contract across restarts, capture the deployed address from the first start's logs and pass it on subsequent starts via `MIDNIGHT_REVOCATION_CONTRACT_ADDRESS`.

- **`POST /revoke`** (auth-required) — calls the revocation circuit.
- **`GET /revocation-status`** — reads the revocation list.

`isRevoked(providers, revocationAddress, credentialId)` is the canonical SDK check: it queries the contract via `publicDataProvider.queryContractState()` and tests `revocationList.member(SHA-256(credentialId))`.

### In-memory state

`packages/vc/src/server/stores/index.ts` holds three process-local Maps:

- `challengeStore` — nonces with 5-minute TTL, auto-purged.
- `offerMetadata` — session metadata between `/offer` and `/issue`.
- `rateLimitStore` — per-IP request counts, purged every 2 minutes.

State is not persisted across restarts; a restart drops all in-flight issuance sessions.

## Rate limits

Per IP, on a 1-minute window:

| Route | Quota (req / min) |
|---|---|
| `/ack` | 10 |
| `/issue` | 10 |
| `/verify` | 30 |
| `/verify-batch` | 10 |
| `/challenge` | 30 |
| `/verify-presentation` | 30 |
| `/rebind-key` | 5 |
| `/claim/:nonce` | 20 |
| `/revoke` | 10 |
| `/revocation-status` | 30 |

`/offer`, `/revoke`, and `/deploy` additionally require a bearer token set via `API_KEY`.

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `MIDNIGHT_WALLET_SEED` | yes | 64–128 hex chars. Drives the wallet and the HKDF-derived issuer P-256 key |
| `API_KEY` | yes | Bearer token for auth routes (`/offer`, `/revoke`, `/deploy`) |
| `PORT` | no | HTTP port (default `3000`) |
| `BASE_URL` | no | Public URL of this server (used in the offer `claimUrl`) |
| `VERIFIER_URL` | no | URL included in the `verificationService` field of issued VCs |
| `MIDNIGHT_INDEXER_URL` | no | Defaults to the preprod indexer |
| `MIDNIGHT_INDEXER_WS_URL` | no | Defaults to the preprod indexer WS |
| `MIDNIGHT_NODE_URL` | no | Defaults to `rpc.preprod.midnight.network` |
| `MIDNIGHT_PROOF_SERVER_URL` | no | Defaults to `http://localhost:6300` |
| `MIDNIGHT_NETWORK_ID` | no | Defaults to `preprod` |
| `MIDNIGHT_REVOCATION_CONTRACT_ADDRESS` | no | If set, attach to this existing revocation contract instead of deploying a fresh one |
| `GOOGLE_CLIENT_ID` | no | For OIDC id-token verification in `/ack` |
| `APPLE_BUNDLE_ID` / `APPLE_TEAM_ID` | no | For Apple Sign-In in `/ack` |

## Reference clients

- **Issuer (server)** — [`examples/diploma-server.ts`](examples/diploma-server.ts): minimal server config for a diploma credential subject type.
- **End-to-end smoke** — [`examples/e2e.ts`](examples/e2e.ts): runs through `offer` → `ack` → `issue` → `verify` against a pre-deployed issuer.
- **Holder wallet** — Expo / React-Native app in [`midnames/school`](https://github.com/midnames/school) under `apps/wallet`. Uses `@midnames/vc/core` for crypto and signing, `expo-secure-store` for key storage, `expo-local-authentication` to gate access to the private key.
- **Mobile verifier** — `apps/mobile-verifier` in the same `midnames/school` repository. Scans the holder's signed VP over QR and calls `/verify-presentation` against a configurable verifier URL.

Because verification is offchain, any deployment of `@midnames/vc/server` can serve as a verifier; issuers and verifiers do not need to share state beyond the public DID registry on Midnight.

## Workspace layout

```
packages/vc/         @midnames/vc      — single publishable package
  src/core/                            — crypto primitives, session protocol, VC types (./core export)
  src/server/                          — HTTP server, DID deployment, issuance / verification / revocation routes (./server export)
  contracts/                           — revocation-list.compact source
contract/            (legacy)          — old custom DID-registry contract (kept for reference)
midnames-cli/        (legacy)          — interactive CLI for the legacy contract
utils/               (legacy)          — helpers used by the legacy CLI
examples/            diploma-server.ts, e2e.ts, deploy-issuer.ts
docs/                Midnight_DID_method.md (W3C method spec), did_spec.md
```

`packages/vc/` is the active publishable library. `contract/`, `midnames-cli/`, and `utils/` target the older registry implementation and are not part of the v1.0 RC.

## Build

All commands run from the repository root with `pnpm`.

```bash
# Install workspace
pnpm install

# Typecheck the package
pnpm --filter @midnames/vc typecheck

# Build the package (prebuild compiles two Compact contracts, postbuild copies managed/ into dist/)
pnpm --filter @midnames/vc build
```

The prebuild compiles:

- the official `midnight-did` contract → `src/server/managed/did/`
- `packages/vc/contracts/revocation-list.compact` → `src/server/managed/revocation-list/`

## Spec

- [`docs/Midnight_DID_method.md`](docs/Midnight_DID_method.md) — W3C DID method spec.
- [`docs/did_spec.md`](docs/did_spec.md) — detailed credential format spec.

## License

Apache-2.0.
