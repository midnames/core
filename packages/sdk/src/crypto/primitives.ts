import { createHash, hkdf, randomBytes } from "node:crypto";
import { ethers } from "ethers";

const ISSUER_SALT = Buffer.from("midnames-vc-issuer-v1", "utf-8");
const KEY_INFO = Buffer.from("secp256k1-signing-key", "utf-8");

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

  /**
   * Compute holder commitment: SHA-256(owner_secret || pub_key_x || pub_key_y)
   */
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

export function decodeSignature(base64Proof: string): { r: string; s: string; v: number } {
  const raw = Uint8Array.from(atob(base64Proof), (c) => c.charCodeAt(0));
  if (raw.length !== 65) throw new Error(`Invalid signature length: ${raw.length}`);
  return {
    r: "0x" + Buffer.from(raw.slice(0, 32)).toString("hex"),
    s: "0x" + Buffer.from(raw.slice(32, 64)).toString("hex"),
    v: raw[64] + 27,
  };
}

export async function createIssuerKeys(
  seed?: string,
): Promise<{ privKey: Uint8Array; signingKey: ethers.SigningKey }> {
  let privateKeyBytes: Uint8Array;

  if (seed) {
    const derivedKey = await new Promise<ArrayBuffer>((resolve, reject) => {
      hkdf("sha256", Buffer.from(seed, "utf-8"), ISSUER_SALT, KEY_INFO, 32, (err, key) => {
        if (err) reject(err);
        else resolve(key);
      });
    });
    privateKeyBytes = new Uint8Array(derivedKey);
  } else {
    privateKeyBytes = new Uint8Array(randomBytes(32));
  }

  const privateKeyHex = "0x" + Buffer.from(privateKeyBytes).toString("hex");
  return { privKey: privateKeyBytes, signingKey: new ethers.SigningKey(privateKeyHex) };
}
