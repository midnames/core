export const PORT: number = parseInt(process.env.PORT || "3000", 10);
export const API_KEY = process.env.API_KEY;
export const BASE_URL: string = process.env.BASE_URL || `http://localhost:${PORT}`;
export const VERIFIER_URL: string = process.env.VERIFIER_URL || BASE_URL;
export const DASHBOARD_API_URL: string = process.env.DASHBOARD_API_URL || "http://localhost:3001";

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
export const APPLE_BUNDLE_ID: string = process.env.APPLE_BUNDLE_ID || "com.midnames.vcwallet";
export const APPLE_TEAM_ID: string = process.env.APPLE_TEAM_ID || "";
export const ANDROID_SHA256: string = process.env.ANDROID_SHA256 || "";

export const RATE_LIMIT_WINDOW_MS = 60 * 1000;
export const CHALLENGE_TTL_MS = 5 * 60 * 1000;

export const MAX_BODY_SIZE = 64 * 1024;
export const MAX_CREDENTIAL_BYTES: number = 2048;
