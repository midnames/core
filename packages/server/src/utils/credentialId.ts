import { webcrypto } from "node:crypto";

export async function hashCredentialId(credentialId: string): Promise<Uint8Array> {
  const data = new TextEncoder().encode(credentialId);
  const hashBuffer = await webcrypto.subtle.digest("SHA-256", data);
  return new Uint8Array(hashBuffer);
}
