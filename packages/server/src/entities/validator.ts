import * as z from "zod";
import type { VerifiableCredential } from "@midnames/sdk";

const ISODateString = z.string().refine((v) => !isNaN(Date.parse(v)), "Must be a valid date");

export const MidnightDID = z
  .string()
  .regex(/^did:midnight:[a-z0-9]+:[a-fA-F0-9]{64}$/, "Must be a valid Midnight DID");

// ============================================================================
// Offer request — credential field is generic (validated by config.validateSubject)
// ============================================================================

export const OfferRequestSchema = z
  .object({
    issuerDid: MidnightDID,
    issuerSeed: z.string().optional(),
    issuerName: z.string().min(1).max(200),
    issuerLogoUrl: z.string().url().max(200).optional(),
    userEmail: z.string().email().max(200).optional(),
    userId: z.string().min(1).max(50).optional(),
    dashboardCallbackUrl: z.string().url().max(500).optional(),
    credential: z.record(z.unknown()),
    expiresIn: z.number().int().positive().optional(),
  })
  .strict();

// ============================================================================
// Acknowledge request (wallet → server)
// ============================================================================

export const AcknowledgeRequestSchema = z
  .object({
    preAuthorizedCode: z.string().uuid(),
    holderCommitment: z.string().min(1),
    holderPublicKey: z.string().min(1),
    cdcvmPublicKey: z.string().min(1).optional(),
    cdcvmAttestationChain: z.array(z.string().min(1)).min(2).optional(),
    idToken: z.string().min(1).optional(),
    idTokenProvider: z.enum(["google", "apple"]).optional(),
  })
  .strict();

// ============================================================================
// Issue from session (wallet → server)
// ============================================================================

export const IssueFromSessionSchema = z
  .object({
    sessionId: z.string().uuid(),
    holderCommitment: z.string().min(1),
  })
  .strict();

// ============================================================================
// Verify presentation
// ============================================================================

export const VerifyPresentationSchema = z.object({
  type: z.string(),
  verifiableCredential: z
    .array(
      z.object({
        "@context": z.array(z.string()).min(1),
        id: z.string().min(1).optional(),
        type: z.array(z.string()).min(1),
        issuer: z.union([MidnightDID, z.object({ id: MidnightDID }).passthrough()]),
        issuanceDate: ISODateString.optional(),
        expirationDate: ISODateString.optional(),
        credentialSubject: z.object({ id: z.string().optional() }).passthrough(),
        proof: z
          .object({
            type: z.string().min(1),
            cryptosuite: z.string().min(1).optional(),
            created: ISODateString.optional(),
            verificationMethod: z.string().min(1).optional(),
            proofPurpose: z.string().min(1).optional(),
            proofValue: z.string().min(1).optional(),
          })
          .strict()
          .optional(),
      }).passthrough(),
    )
    .min(1),
  holder: MidnightDID,
  proof: z
    .object({
      type: z.string().min(1),
      challenge: z.string().uuid(),
      created: ISODateString,
      proofValue: z.string().min(1),
      cdcvmProofValue: z.string().min(1).optional(),
    })
    .strict(),
});

// ============================================================================
// Credential structure validation (for /verify endpoint)
// ============================================================================

export const VerifiableCredentialSchema = z
  .object({
    "@context": z.array(z.string()).min(1),
    id: z.string().min(1),
    type: z.array(z.string()).min(1),
    issuer: z.union([MidnightDID, z.object({ id: MidnightDID }).passthrough()]),
    issuanceDate: ISODateString,
    credentialSubject: z.object({ id: MidnightDID.optional() }).passthrough(),
    proof: z
      .object({
        type: z.string().min(1),
        cryptosuite: z.string().min(1).optional(),
        created: ISODateString.optional(),
        verificationMethod: z.string().min(1).optional(),
        proofPurpose: z.string().min(1).optional(),
        proofValue: z.string().min(1).optional(),
      })
      .strict()
      .optional(),
  })
  .passthrough();

// ============================================================================
// Batch verify
// ============================================================================

export const BatchVerifySchema = z
  .object({ credentials: z.array(VerifiableCredentialSchema).min(1).max(20) })
  .strict();

// ============================================================================
// Rebind CDCVM key
// ============================================================================

export const RebindKeySchema = z
  .object({
    holderDid: MidnightDID,
    credentialId: z.string().min(1),
    credentialType: z.string().min(1),
    challenge: z.string().uuid(),
    proof: z.string().min(1),
    newCdcvmPublicKey: z.string().min(1),
    newCdcvmAttestationChain: z.array(z.string().min(1)).min(2),
  })
  .strict();

// ============================================================================
// Revocation
// ============================================================================

export const RevokeCredentialSchema = z
  .object({ credentialId: z.string().min(1).max(500) })
  .strict();

export function validateCredentialStructure(
  vc: unknown,
): { valid: true; credential: z.infer<typeof VerifiableCredentialSchema> } | { valid: false; error: string } {
  const result = VerifiableCredentialSchema.safeParse(vc);
  if (result.success) return { valid: true, credential: result.data };
  return { valid: false, error: result.error.message };
}
