/**
 * Example: diploma issuance server built on @midnames/vc/server.
 *
 * Run (after `compact compile` and `bun install`):
 *   MIDNIGHT_WALLET_SEED=<hex> API_KEY=<secret> bun run examples/diploma-server.ts
 */

import { z } from "zod";
import { startMidnamesServer } from "@midnames/vc/server";

// ============================================================================
// 1. Define your credential subject schema
// ============================================================================

const DiplomaSchema = z.object({
  studentName: z.string().min(1),
  degree: z.string().min(1),
  institution: z.string().min(1),
  graduationYear: z.number().int().min(1900).max(2100),
});

type DiplomaSubject = z.infer<typeof DiplomaSchema> & { id: string };

// ============================================================================
// 2. Start the server
// ============================================================================

const handle = await startMidnamesServer<DiplomaSubject>({
  credentialType: ["VerifiableCredential", "UniversityDegree"],

  // Validate raw input from /offer request body — throw on invalid
  validateSubject: (raw) => DiplomaSchema.parse(raw) as DiplomaSubject,

  // Build the credentialSubject that ends up in the signed VC
  buildCredential: (subject, holderDid, _issuerDid) => ({
    ...subject,
    id: holderDid,
  }),

  // Optional: called after a credential is successfully issued
  onIssued: async (vc) => {
    console.log(`Issued diploma ${vc.id} to ${vc.credentialSubject.id}`);
  },
});

console.log(`Server running on port ${handle.port}`);

// Graceful shutdown on Ctrl-C is handled inside startMidnamesServer.
// You can also call handle.stop() manually if needed.
