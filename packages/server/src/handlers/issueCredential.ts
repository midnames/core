import { canonicalize } from "json-canonicalize";
import { ethers } from "ethers";
import { createIssuerKeys } from "@midnames/sdk";
import type { VerifiableCredential, Issuer } from "@midnames/sdk";
import * as MidnamesServerConstants from "../constants.js";

export interface IssueCredentialOptions {
  seed?: string;
  issuerName?: string;
  issuerLogoUrl?: string;
  issuanceDate?: string;
  expirationDate?: string;
}

/**
 * Sign and return a W3C Verifiable Credential for any subject type.
 *
 * The caller is responsible for building the credentialSubject (including setting
 * `id` to the holder DID). This function handles canonicalization, signing, and
 * proof attachment.
 */
export async function issueCredential<TSubject extends Record<string, unknown>>(
  issuerDid: string,
  credentialSubject: TSubject & { id?: string },
  credentialTypes: string[],
  options: IssueCredentialOptions = {},
): Promise<VerifiableCredential<TSubject>> {
  const { seed, issuerName, issuerLogoUrl, issuanceDate, expirationDate } = options;

  const { signingKey } = await createIssuerKeys(seed);

  const issuanceDateStr = issuanceDate ?? new Date().toISOString();
  const defaultExpiration = new Date();
  defaultExpiration.setFullYear(defaultExpiration.getFullYear() + 1);
  const expirationDateStr = expirationDate ?? defaultExpiration.toISOString();

  let issuer: Issuer;
  if (issuerName || issuerLogoUrl) {
    const obj: { id: string; name?: string; image?: string } = { id: issuerDid };
    if (issuerName) obj.name = issuerName;
    if (issuerLogoUrl) obj.image = issuerLogoUrl;
    issuer = obj;
  } else {
    issuer = issuerDid;
  }

  const vc: VerifiableCredential<TSubject> = {
    "@context": ["https://www.w3.org/ns/credentials/v2"],
    id: `urn:uuid:${crypto.randomUUID()}`,
    type: ["VerifiableCredential", ...credentialTypes.filter((t) => t !== "VerifiableCredential")],
    issuer,
    issuanceDate: issuanceDateStr,
    expirationDate: expirationDateStr,
    verificationService: MidnamesServerConstants.VERIFIER_URL,
    credentialSubject,
  };

  const jsonStr = canonicalize(vc);
  const jsonBytes = new TextEncoder().encode(jsonStr);

  if (jsonBytes.length > MidnamesServerConstants.MAX_CREDENTIAL_BYTES) {
    throw new Error(
      `Credential too large: ${jsonBytes.length} bytes (max ${MidnamesServerConstants.MAX_CREDENTIAL_BYTES})`,
    );
  }

  const credentialHash = ethers.sha256(jsonBytes);
  const signature = signingKey.sign(credentialHash);

  const rBytes = ethers.getBytes(signature.r);
  const sBytes = ethers.getBytes(signature.s);
  const sigBytes = new Uint8Array(65);
  sigBytes.set(rBytes, 0);
  sigBytes.set(sBytes, 32);
  sigBytes[64] = signature.v - 27;

  vc.proof = {
    type: "EcdsaSecp256k1RecoverySignature2020",
    created: new Date().toISOString(),
    proofPurpose: "assertionMethod",
    verificationMethod: `${issuerDid}#key-1`,
    proofValue: Buffer.from(sigBytes).toString("base64"),
  };

  return vc;
}
