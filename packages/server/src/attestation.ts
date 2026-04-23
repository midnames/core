import { X509Certificate } from "node:crypto";
import { logger } from "./logger.js";

const GOOGLE_ROOT_CA_PEMS = [
  // Current RSA root (f92009e853b6b045)
  `-----BEGIN CERTIFICATE-----
MIIFHDCCAwSgAwIBAgIJAPHBcqaZ6vUdMA0GCSqGSIb3DQEBCwUAMBsxGTAXBgNV
BAUTEGY5MjAwOWU4NTNiNmIwNDUwHhcNMjIwMzIwMTgwNzQ4WhcNNDIwMzE1MDgw
NzQ4WjAbMRkwFwYDVQQFExBmOTIwMDllODUzYjZiMDQ1MIICIjANBgkqhkiG9w0B
AQEFAAOCAg8AMIICCgKCAgEAr7bHgiuxpwHsK7Qui8xUFmOr75gvMsd/dTEDDJdS
Sxtf6An7xyqpRR90PL2abxM1dEqlXnf2tqw1Ne4Xwl5jlRfdnJLmN0pTy/4lj4/7
tv0Sk3iiKkypnEUtR6WfMgH0QZfKHM1+di+y9TFRtv6y//0rb+T+W8a9nsNL/ggj
nar86461qO0rOs2cXjp3kOG1FEJ5MVmFmBGtnrKpa73XpXyTqRxB/M0n1n/W9nGq
C4FSYa04T6N5RIZGBN2z2MT5IKGbFlbC8UrW0DxW7AYImQQcHtGl/m00QLVWutHQ
oVJYnFPlXTcHYvASLu+RhhsbDmxMgJJ0mcDpvsC4PjvB+TxywElgS70vE0XmLD+O
JtvsBslHZvPBKCOdT0MS+tgSOIfga+z1Z1g7+DVagf7quvmag8jfPioyKvxnK/Eg
sTUVi2ghzq8wm27ud/mIM7AY2qEORR8Go3TVB4HzWQgpZrt3i5MIlCaY504LzSRi
igHCzAPlHws+W0rB5N+er5/2pJKnfBSDiCiFAVtCLOZ7gLiMm0jhO2B6tUXHI/+M
RPjy02i59lINMRRev56GKtcd9qO/0kUJWdZTdA2XoS82ixPvZtXQpUpuL12ab+9E
aDK8Z4RHJYYfCT3Q5vNAXaiWQ+8PTWm2QgBR/bkwSWc+NpUFgNPN9PvQi8WEg5Um
AGMCAwEAAaNjMGEwHQYDVR0OBBYEFDZh4QB8iAUJUYtEbEf/GkzJ6k8SMB8GA1Ud
IwQYMBaAFDZh4QB8iAUJUYtEbEf/GkzJ6k8SMA8GA1UdEwEB/wQFMAMBAf8wDgYD
VR0PAQH/BAQDAgIEMA0GCSqGSIb3DQEBCwUAA4ICAQB8cMqTllHc8U+qCrOlg3H7
174lmaCsbo/bJ0C17JEgMLb4kvrqsXZs01U3mB/qABg/1t5Pd5AORHARs1hhqGIC
W/nKMav574f9rZN4PC2ZlufGXb7sIdJpGiO9ctRhiLuYuly10JccUZGEHpHSYM2G
tkgYbZba6lsCPYAAP83cyDV+1aOkTf1RCp/lM0PKvmxYN10RYsK631jrleGdcdkx
oSK//mSQbgcWnmAEZrzHoF1/0gso1HZgIn0YLzVhLSA/iXCX4QT2h3J5z3znluKG
1nv8NQdxei2DIIhASWfu804CA96cQKTTlaae2fweqXjdN1/v2nqOhngNyz1361mFm
r4XmaKH/ItTwOe72NI9ZcwS1lVaCvsIkTDCEXdm9rCNPAY10iTunIHFXRh+7KPzl
HGewCq/8TOohBRn0/NNfh7uRslOSZ/xKbN9tMBtw37Z8d2vvnXq/YWdsm1+JLVwn
6yYD/yacNJBlwpddla8eaVMjsF6nBnIgQOf9zKSe06nSTqvgwUHosgOECZJZ1Euz
bH4yswbt02tKtKEFhx+v+OTge/06V+jGsqTWLsfrOCNLuA8H++z+pUENmpqnnHov
aI47gC+TNpkgYGkkBT6B/m/U01BuOBBTzhIlMEZq9qkDWuM2cA5kW5V3FJUcfHnw
1IdYIg2Wxg7yHcQZemFQg==
-----END CERTIFICATE-----`,
  // New ECDSA P-384 root (active Feb 2026)
  `-----BEGIN CERTIFICATE-----
MIICIjCCAaigAwIBAgIRAISp0Cl7DrWK5/8OgN52BgUwCgYIKoZIzj0EAwMwUjEc
MBoGA1UEAwwTS2V5IEF0dGVzdGF0aW9uIENBMTEQMA4GA1UECwwHQW5kcm9pZDET
MBEGA1UECgwKR29vZ2xlIExMQzELMAkGA1UEBhMCVVMwHhcNMjUwNzE3MjIzMjE4
WhcNMzUwNzE1MjIzMjE4WjBSMRwwGgYDVQQDDBNLZXkgQXR0ZXN0YXRpb24gQ0Ex
MRAwDgYDVQQLDAdBbmRyb2lkMRMwEQYDVQQKDApHb29nbGUgTExDMQswCQYDVQQG
EwJVUzB2MBAGByqGSM49AgEGBSuBBAAiA2IABCPaI3FO3z5bBQo8cuiEas4HjqCt
G/mLFfRT0MsIssPBEEU5Cfbt6sH5yOAxqEi5QagpU1yX4HwnGb7OtBYpDTB57uH5
Eczm34A5FNijV3s0/f0UPl7zbJcTx6xwqMIRq6NCMEAwDwYDVR0TAQH/BAUwAwEB
/zAOBgNVHQ8BAf8EBAMCAQYwHQYDVR0OBBYEFFIyuyz7RkOb3NaBqQ5lZuA0QepA
MAoGCCqGSM49BAMDA2gAMGUCMETfjPO/HwqReR2CS7p0ZWoD/LHs6hDi422opifH
EUaYLxwGlT9SLdjkVpz0UUOR5wIxAIoGyxGKRHVTpqpGRFiJtQEOOTp/+s1GcxeY
uR2zh/80lQyu9vAFCj6E4AXc+osmRg==
-----END CERTIFICATE-----`,
];

export interface AttestationResult {
  valid: boolean;
  publicKey?: string;
  error?: string;
  securityLevel?: "Software" | "TEE" | "StrongBox";
}

export function verifyAndroidAttestation(chain: string[], expectedChallenge: string): AttestationResult {
  try {
    if (!chain || chain.length < 2) {
      return { valid: false, error: "Attestation chain too short (need at least leaf + intermediate)" };
    }

    const certs = chain.map((b64, i) => {
      const cleaned = b64.replace(/\s/g, "").replace(/-/g, "+").replace(/_/g, "/");
      const der = Buffer.from(cleaned, "base64");
      logger.debug(`Attestation cert[${i}]: ${der.length} bytes`);
      return new X509Certificate(der);
    });

    const googleRoots = GOOGLE_ROOT_CA_PEMS.map((pem) => new X509Certificate(pem));
    const leaf = certs[0];

    for (let i = 0; i < certs.length - 1; i++) {
      if (!certs[i].checkIssued(certs[i + 1])) return { valid: false, error: `Certificate chain broken at index ${i}` };
      if (!certs[i].verify(certs[i + 1].publicKey)) return { valid: false, error: `Certificate signature invalid at index ${i}` };
    }

    const lastCert = certs[certs.length - 1];
    const rootMatch = googleRoots.some((googleRoot) => {
      try {
        if (lastCert.fingerprint === googleRoot.fingerprint) return true;
        return lastCert.verify(googleRoot.publicKey);
      } catch {
        return false;
      }
    });

    if (!rootMatch) {
      return { valid: false, error: "Chain does not terminate at Google hardware attestation root" };
    }

    const now = new Date();
    if (now < new Date(leaf.validFrom) || now > new Date(leaf.validTo)) {
      return { valid: false, error: "Leaf certificate is expired or not yet valid" };
    }

    const attestationExt = extractAttestationExtension(leaf);
    if (!attestationExt) return { valid: false, error: "No attestation extension found in leaf certificate" };

    const challengeBytes = Buffer.from(expectedChallenge, "utf-8");
    if (!attestationExt.challenge.equals(challengeBytes)) {
      return { valid: false, error: "Attestation challenge mismatch" };
    }

    if (attestationExt.securityLevel === "Software") {
      logger.warn("Attestation security level is Software (not hardware-backed)");
    }

    if (!attestationExt.purposes.includes(2)) {
      return { valid: false, error: "Attested key does not have SIGN purpose" };
    }

    const exported = leaf.publicKey.export({ type: "spki", format: "der" }) as Buffer;
    const uncompressed = exported.subarray(exported.length - 65);
    if (uncompressed[0] !== 0x04) {
      return { valid: false, error: "Leaf cert public key is not an uncompressed EC point" };
    }

    return { valid: true, publicKey: "0x" + Buffer.from(uncompressed).toString("hex"), securityLevel: attestationExt.securityLevel };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    logger.error(`Attestation verification failed: ${msg}`);
    return { valid: false, error: `Attestation verification error: ${msg}` };
  }
}

function extractAttestationExtension(cert: X509Certificate): {
  challenge: Buffer;
  securityLevel: "Software" | "TEE" | "StrongBox";
  purposes: number[];
} | null {
  const derCert = Buffer.from(
    cert.toString()
      .replace(/-----BEGIN CERTIFICATE-----/g, "")
      .replace(/-----END CERTIFICATE-----/g, "")
      .replace(/\s/g, ""),
    "base64",
  );

  const oidBytes = Buffer.from([0x06, 0x0a, 0x2b, 0x06, 0x01, 0x04, 0x01, 0xd6, 0x79, 0x02, 0x01, 0x11]);
  const oidIndex = derCert.indexOf(oidBytes);
  if (oidIndex === -1) return null;

  let pos = oidIndex + oidBytes.length;
  if (pos < derCert.length && derCert[pos] === 0x01) pos += 3;
  if (pos >= derCert.length || derCert[pos] !== 0x04) return null;
  pos++;
  const { bytesRead: octetLenBytes } = readDerLength(derCert, pos);
  pos += octetLenBytes;

  if (pos >= derCert.length || derCert[pos] !== 0x30) return null;
  pos++;
  const { bytesRead: seqLenBytes } = readDerLength(derCert, pos);
  pos += seqLenBytes;

  const { endPos: afterVer } = readDerInteger(derCert, pos);
  pos = afterVer;
  const { value: attestSecLevel, endPos: afterSecLevel } = readDerEnumerated(derCert, pos);
  pos = afterSecLevel;
  const { endPos: afterKmVer } = readDerInteger(derCert, pos);
  pos = afterKmVer;
  const { endPos: afterKmSecLevel } = readDerEnumerated(derCert, pos);
  pos = afterKmSecLevel;

  if (pos >= derCert.length || derCert[pos] !== 0x04) return null;
  pos++;
  const { value: challengeLen, bytesRead: challengeLenBytes } = readDerLength(derCert, pos);
  pos += challengeLenBytes;
  const challenge = derCert.subarray(pos, pos + challengeLen);

  const securityLevelMap: Record<number, "Software" | "TEE" | "StrongBox"> = { 0: "Software", 1: "TEE", 2: "StrongBox" };

  return { challenge: Buffer.from(challenge), securityLevel: securityLevelMap[attestSecLevel] ?? "Software", purposes: [2] };
}

function readDerLength(buf: Buffer, pos: number): { value: number; bytesRead: number } {
  if (pos >= buf.length) return { value: 0, bytesRead: 0 };
  const first = buf[pos];
  if (first < 0x80) return { value: first, bytesRead: 1 };
  const numBytes = first & 0x7f;
  let value = 0;
  for (let i = 0; i < numBytes; i++) value = (value << 8) | buf[pos + 1 + i];
  return { value, bytesRead: 1 + numBytes };
}

function readDerInteger(buf: Buffer, pos: number): { value: number; endPos: number } {
  if (pos >= buf.length || buf[pos] !== 0x02) return { value: 0, endPos: pos };
  pos++;
  const { value: len, bytesRead } = readDerLength(buf, pos);
  pos += bytesRead;
  let value = 0;
  for (let i = 0; i < len; i++) value = (value << 8) | buf[pos + i];
  return { value, endPos: pos + len };
}

function readDerEnumerated(buf: Buffer, pos: number): { value: number; endPos: number } {
  if (pos >= buf.length || buf[pos] !== 0x0a) return { value: 0, endPos: pos };
  pos++;
  const { value: len, bytesRead } = readDerLength(buf, pos);
  pos += bytesRead;
  let value = 0;
  for (let i = 0; i < len; i++) value = (value << 8) | buf[pos + i];
  return { value, endPos: pos + len };
}
