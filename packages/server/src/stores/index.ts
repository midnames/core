import * as MidnamesServerConstants from "../constants.js";

export interface ChallengeEntry {
  createdAt: number;
  used: boolean;
}

export interface RateLimitEntry {
  count: number;
  resetAt: number;
}

export interface OfferMetadataEntry {
  issuerDid: string;
  issuerSeed?: string;
  issuerName: string;
  issuerLogoUrl?: string;
  userEmail?: string;
  userId?: string;
  dashboardCallbackUrl?: string;
  credentialData?: unknown;
  holderPublicKey?: string;
  holderDid?: string;
  cdcvmPublicKey?: string;
}

export const challengeStore = new Map<string, ChallengeEntry>();
setInterval(() => {
  const now = Date.now();
  for (const [nonce, entry] of challengeStore) {
    if (entry.used || now - entry.createdAt > MidnamesServerConstants.CHALLENGE_TTL_MS) {
      challengeStore.delete(nonce);
    }
  }
}, 60_000);

export const cdcvmAttestationStore = new Map<string, string[]>();

export const rateLimitStore = new Map<string, RateLimitEntry>();
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore) {
    if (now > entry.resetAt) rateLimitStore.delete(key);
  }
}, 2 * 60 * 1000);

export const offerMetadata = new Map<string, OfferMetadataEntry>();

export function isRateLimited(ip: string, maxRequests: number): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + MidnamesServerConstants.RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > maxRequests;
}
