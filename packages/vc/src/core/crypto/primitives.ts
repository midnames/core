import { createHash, hkdf, randomBytes } from "node:crypto";
import { p256 } from "@noble/curves/p256";

const ISSUER_SALT = Buffer.from("midnames-vc-issuer-v1", "utf-8");
const KEY_INFO = Buffer.from("p256-signing-key", "utf-8");

export class CryptoPrimitives {
  static hexToUint8Array(hex: string): Uint8Array {
    const cleanHex = hex.startsWith("0x") ? hex.slice(2) : hex;
    const paddedHex = cleanHex.length % 2 === 0 ? cleanHex : "0" + cleanHex;
    const len = paddedHex.length / 2;
    const u8 = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      u8[i] = parseInt(paddedHex.slice(i * 2, i * 2 + 2), 16);
    }
    return u8;
  }

  static uint8ArrayToHex(buffer: Uint8Array): string {
    const hex: string[] = [];
    buffer.forEach((i) => {
      let h = i.toString(16);
      if (h.length % 2) h = "0" + h;
      hex.push(h);
    });
    return "0x" + hex.join("");
  }

  static sha256(data: Uint8Array): Uint8Array {
    return new Uint8Array(createHash("sha256").update(data).digest());
  }

  static hexToBytes(hex: string): number[] {
    const cleanHex = hex.startsWith("0x") ? hex.slice(2) : hex;
    const paddedHex = cleanHex.length % 2 === 0 ? cleanHex : "0" + cleanHex;
    const result: number[] = [];
    for (let i = 0; i < paddedHex.length; i += 2) {
      result.push(parseInt(paddedHex.slice(i, i + 2), 16));
    }
    return result;
  }

  static bytesToHex(bytes: number[] | Uint8Array): string {
    return Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  static stringToBytes(str: string, len: number): number[] {
    const encoder = new TextEncoder();
    const encoded = encoder.encode(str);
    const result = new Array(len).fill(0);
    for (let i = 0; i < Math.min(encoded.length, len); i++) {
      result[i] = encoded[i];
    }
    return result;
  }

  static ComputeCommitment(
    ownerSecret: string,
    issuerPubKeyX: number[],
    issuerPubKeyY: number[],
  ): string {
    const secretBytes = CryptoPrimitives.hexToBytes(ownerSecret);
    const input = new Uint8Array(96);
    for (let i = 0; i < 32; i++) {
      input[i] = secretBytes[i];
      input[32 + i] = issuerPubKeyX[i];
      input[64 + i] = issuerPubKeyY[i];
    }
    return CryptoPrimitives.bytesToHex(CryptoPrimitives.sha256(input));
  }
}

export function parseUncompressedKey(pubKeyHex: string): { x: string; y: string } {
  const hex = pubKeyHex.startsWith("0x04")
    ? pubKeyHex.slice(4)
    : pubKeyHex.slice(2);
  return { x: hex.slice(0, 64), y: hex.slice(64, 128) };
}

export function buildUncompressedPubKey(jwk: { x: bigint | string; y: bigint | string }): string {
  const xHex = typeof jwk.x === "bigint"
    ? jwk.x.toString(16).padStart(64, "0")
    : String(jwk.x).padStart(64, "0");
  const yHex = typeof jwk.y === "bigint"
    ? jwk.y.toString(16).padStart(64, "0")
    : String(jwk.y).padStart(64, "0");
  return "0x04" + xHex + yHex;
}

/** Decode a base64-encoded 64-byte raw P-256 signature [r(32)||s(32)]. */
export function decodeSignature(base64Proof: string): Uint8Array {
  const raw = Uint8Array.from(atob(base64Proof), (c) => c.charCodeAt(0));
  if (raw.length !== 64) throw new Error(`Invalid P-256 signature length: ${raw.length} (expected 64)`);
  return raw;
}

/**
 * Derive a deterministic P-256 key pair from a seed string via HKDF-SHA256.
 * Without a seed, generates a random key pair.
 */
export async function createIssuerKeyPair(seed?: string): Promise<{
  privKey: Uint8Array;
  pubKeyRaw: string; // "0x04" + x(64hex) + y(64hex)
}> {
  let privKey: Uint8Array;

  if (seed) {
    const derivedKey = await new Promise<ArrayBuffer>((resolve, reject) => {
      hkdf("sha256", Buffer.from(seed, "utf-8"), ISSUER_SALT, KEY_INFO, 32, (err, key) => {
        if (err) reject(err);
        else resolve(key);
      });
    });
    privKey = new Uint8Array(derivedKey);
  } else {
    privKey = new Uint8Array(randomBytes(32));
  }

  const pubPoint = p256.getPublicKey(privKey, false); // 65-byte uncompressed [0x04, x32, y32]
  const pubKeyRaw = "0x" + Buffer.from(pubPoint).toString("hex");

  return { privKey, pubKeyRaw };
}

/** Sign dataBytes with a P-256 private key. Returns 64-byte compact sig [r(32)||s(32)] with low-S. */
export function signP256(privKey: Uint8Array, dataBytes: Uint8Array): Uint8Array {
  const hash = createHash("sha256").update(dataBytes).digest();
  const sig = p256.sign(hash, privKey, { lowS: true });
  return sig.toCompactRawBytes();
}

/** Verify a 64-byte P-256 compact signature against an uncompressed public key hex. */
export function verifyP256(pubKeyHex: string, sig: Uint8Array, dataBytes: Uint8Array): boolean {
  try {
    const hash = createHash("sha256").update(dataBytes).digest();
    const cleanHex = pubKeyHex.startsWith("0x") ? pubKeyHex.slice(2) : pubKeyHex;
    const pubKeyBytes = Buffer.from(cleanHex, "hex");
    return p256.verify(sig, hash, pubKeyBytes, { lowS: true });
  } catch {
    return false;
  }
}
