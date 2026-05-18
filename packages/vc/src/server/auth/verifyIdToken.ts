import { createRemoteJWKSet, jwtVerify } from "jose";

interface VerifiedIdentity {
  email: string;
  provider: "google" | "apple";
}

const googleJWKS = createRemoteJWKSet(new URL("https://www.googleapis.com/oauth2/v3/certs"));
const appleJWKS = createRemoteJWKSet(new URL("https://appleid.apple.com/auth/keys"));

async function verifyGoogleIdToken(idToken: string, audience: string): Promise<VerifiedIdentity> {
  const { payload } = await jwtVerify(idToken, googleJWKS, {
    issuer: "https://accounts.google.com",
    audience,
  });
  if (!payload.email_verified) throw new Error("Google email not verified");
  const email = payload.email as string;
  if (!email) throw new Error("No email in Google ID token");
  return { email, provider: "google" };
}

async function verifyAppleIdToken(idToken: string, audience: string): Promise<VerifiedIdentity> {
  const { payload } = await jwtVerify(idToken, appleJWKS, {
    issuer: "https://appleid.apple.com",
    audience,
  });
  const email = payload.email as string;
  if (!email) throw new Error("No email in Apple ID token");
  return { email, provider: "apple" };
}

export async function verifyIdToken(
  idToken: string,
  provider: "google" | "apple",
  googleClientId: string,
  appleBundleId: string,
): Promise<VerifiedIdentity> {
  return provider === "google"
    ? verifyGoogleIdToken(idToken, googleClientId)
    : verifyAppleIdToken(idToken, appleBundleId);
}
