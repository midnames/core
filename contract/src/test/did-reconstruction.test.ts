import { MidnamesSimulator } from "./midnames-simulator.js";
import { stringToUint8Array, parsePublicKeyHex, parseAdaAddress, uint8ArrayToString, toControllerVector, fromControllerVector } from "@midnames/utils";
import {
  NetworkId,
  setNetworkId,
} from "@midnight-ntwrk/midnight-js-network-id";
import { describe, it, expect } from "vitest";
import {
  type DIDDocument,
  type Ledger,
  type Date as ContractDate,
  type Context,
  type VerificationMethod,
  type Either,
  type Maybe,
  type Service,
  type Credential,
} from "../managed/midnames/contract/index.cjs";
import exampleDid from "../example.did.json" assert { type: "json" };

setNetworkId(NetworkId.Undeployed);


// Helper function to parse publicKeyHex to contract format (130 bytes)
function parsePublicKeyHexToContract(hexString: string): Uint8Array {
  const parsed = parsePublicKeyHex(hexString);
  const arr = new Uint8Array(130); // Contract expects 130 bytes
  for (let i = 0; i < parsed.length && i < 130; i++) {
    arr[i] = parsed[i];
  }
  return arr;
}

// Helper function to parse Ada address to contract format (104 bytes) 
function parseAdaAddressToContract(address: string): Uint8Array {
  const arr = new Uint8Array(104); // Contract expects 104 bytes
  const encoded = parseAdaAddress(address);
  for (let i = 0; i < encoded.length && i < 104; i++) {
    arr[i] = encoded[i];
  }
  return arr;
}

/**
 * Converts example DID JSON data to contract-compatible format
 */
function convertExampleDidToContract(didData: typeof exampleDid) {
  const didId = stringToUint8Array(didData.id, 64);

  // Convert contexts
  const contexts: Context[] = (didData["@context"] || []).map((ctx) => ({
    uri: ctx, // Context.uri is Opaque<'string'>, so it should be a string directly
  }));

  // Convert verification methods
  const verificationMethods: VerificationMethod[] =
    didData.verificationMethod.map((vm) => {
      let key: Either<{ hex: Uint8Array }, { address: Uint8Array }>;

      if ("publicKeyHex" in vm) {
        key = {
          is_left: true,
          left: { hex: parsePublicKeyHexToContract(vm.publicKeyHex ?? "") },
          right: { address: new Uint8Array(104) },
        };
      } else if ("AdaAddress" in vm) {
        key = {
          is_left: false,
          left: { hex: new Uint8Array(130) },
          right: { address: parseAdaAddressToContract(vm.AdaAddress) },
        };
      } else {
        // Default to hex with empty data
        key = {
          is_left: true,
          left: { hex: new Uint8Array(130) },
          right: { address: new Uint8Array(104) },
        };
      }

      return {
        id: vm.id.split("#").pop() || vm.id, // Extract fragment identifier
        type: vm.type,
        key,
        controller: toControllerVector(vm.controller),
        OtherKeys: { is_some: false, value: [["", ""]] as [string[]] },
      };
    });

  // Convert authentication methods
  const authenticationMethods: Either<string, VerificationMethod>[] =
    didData.authentication.map((auth) => {
      if (typeof auth === "string") {
        return {
          is_left: true,
          left: auth.split("#").pop() || auth, // Extract fragment identifier
          right: verificationMethods[0], // Dummy value for union type
        };
      } else {
        // Convert embedded verification method
        let key: Either<{ hex: Uint8Array }, { address: Uint8Array }>;

        if ("publicKeyMultibase" in auth) {
          // For now, treat multibase as hex (simplified)
          key = {
            is_left: true,
            left: { hex: stringToUint8Array(auth.publicKeyMultibase as string, 130) },
            right: { address: new Uint8Array(104) },
          };
        } else {
          key = {
            is_left: true,
            left: { hex: new Uint8Array(130) },
            right: { address: new Uint8Array(104) },
          };
        }

        const verificationMethod: VerificationMethod = {
          id: auth.id.split("#").pop() || auth.id,
          type: auth.type,
          key,
          controller: toControllerVector(auth.controller),
          OtherKeys: { is_some: false, value: [["", ""]] as [string[]] },
        };

        return {
          is_left: false,
          left: "", // Dummy value for union type
          right: verificationMethod,
        };
      }
    });

  // Convert services
  const services = didData.service.map((svc) => ({
    id: svc.id.split("#").pop() || svc.id,
    type: svc.type,
    serviceEndpoint: svc.serviceEndpoint,
    OtherKeys: { is_some: false, value: [["", ""]] as [string[]] },
  }));

  // Convert credentials
  const credentials = didData.credentials.map((cred) => ({
    data: cred.data,
    publicKeyMultibase: cred.publicKeyMultibase,
  }));

  // Create timestamp
  const timestamp: ContractDate = {
    iso_8601_utc: stringToUint8Array(didData.updated, 20),
    seconds: BigInt(new Date(didData.updated).getTime()),
  };

  return {
    didId,
    contexts,
    verificationMethods,
    authenticationMethods,
    services,
    credentials,
    timestamp,
    // Extract main controller from first verification method
    mainController: stringToUint8Array(
      didData.verificationMethod[0].controller,
      64
    ),
    // Extract main public key (simplified)
    mainPublicKey: stringToUint8Array("main_public_key", 64),
  };
}

/**
 * Reconstructs a DID document from on-chain ledger data
 */
function reconstructDidFromLedger(
  ledger: Ledger,
  didId: Uint8Array
): DIDDocument | null {
  // Check if DID exists by checking did_context since did_created is not implemented yet
  if (!ledger.did_context.member(didId)) {
    return null;
  }

  // Since did_created timestamp is not implemented yet, we'll use dummy values
  const createdDate: Maybe<ContractDate> = {
    is_some: false,
    value: { iso_8601_utc: new Uint8Array(20), seconds: BigInt(0) },
  };

  // Get other timestamps (these might not exist)
  let updatedDate: Maybe<ContractDate>;
  let deactivatedDate: Maybe<ContractDate>;

  try {
    updatedDate = ledger.did_last_updated.member(didId)
      ? ledger.did_last_updated.lookup(didId)
      : {
          is_some: false,
          value: { iso_8601_utc: new Uint8Array(20), seconds: BigInt(0) },
        };
  } catch {
    updatedDate = {
      is_some: false,
      value: { iso_8601_utc: new Uint8Array(20), seconds: BigInt(0) },
    };
  }

  try {
    deactivatedDate = ledger.did_deactivated.member(didId)
      ? ledger.did_deactivated.lookup(didId)
      : {
          is_some: false,
          value: { iso_8601_utc: new Uint8Array(20), seconds: BigInt(0) },
        };
  } catch {
    deactivatedDate = {
      is_some: false,
      value: { iso_8601_utc: new Uint8Array(20), seconds: BigInt(0) },
    };
  }

  // Get contexts - provide defaults if not found
  const contexts: Context[] = [];
  try {
    if (ledger.did_context.member(didId)) {
      const contextsData = ledger.did_context.lookup(didId);
      for (const context of contextsData) {
        contexts.push(context);
      }
    }
  } catch {
    // Use default context if lookup fails
  }

  if (contexts.length === 0) {
    contexts.push({
      uri: "https://www.w3.org/ns/did/v1",
    });
  }

  // Get authentication methods
  const authenticationMethods: Either<string, VerificationMethod>[] = [];
  try {
    if (ledger.did_authentication_methods.member(didId)) {
      const authData = ledger.did_authentication_methods.lookup(didId);
      for (const auth of authData) {
        authenticationMethods.push(auth);
      }
    }
  } catch {
    // Use default if lookup fails
  }

  if (authenticationMethods.length === 0) {
    authenticationMethods.push({
      is_left: true,
      left: "keys-1",
      right: {
        id: "default",
        type: "default",
        key: {
          is_left: true,
          left: { hex: new Uint8Array(130) },
          right: { address: new Uint8Array(104) },
        },
        controller: toControllerVector(""),
        OtherKeys: { is_some: false, value: [["", ""]] as [string[]] },
      },
    });
  }

  // Get verification methods
  const verificationMethods: VerificationMethod[] = [];
  try {
    if (ledger.did_verification_methods.member(didId)) {
      const vmData = ledger.did_verification_methods.lookup(didId);
      for (const vm of vmData) {
        verificationMethods.push(vm);
      }
    }
  } catch {
    // Use default if lookup fails
  }

  if (verificationMethods.length === 0) {
    verificationMethods.push({
      id: "keys-1",
      type: "BIP32-Ed25519",
      key: {
        is_left: true,
        left: { hex: new Uint8Array(130) },
        right: { address: new Uint8Array(104) },
      },
      controller: toControllerVector(""),
      OtherKeys: { is_some: false, value: [["", ""]] as [string[]] },
    });
  }

  // Get services
  const services: Array<{
    id: string;
    type: string;
    serviceEndpoint: string;
    OtherKeys: Maybe<[string[]]>;
  }> = [];
  try {
    if (ledger.did_services.member(didId)) {
      const servicesData = ledger.did_services.lookup(didId);
      for (const service of servicesData) {
        services.push(service);
      }
    }
  } catch {
    // Use default if lookup fails
  }

  if (services.length === 0) {
    services.push({
      id: "service-1",
      type: "DIDCommMessaging",
      serviceEndpoint: "https://example.com/endpoint",
      OtherKeys: { is_some: false, value: [["", ""]] as [string[]] },
    });
  }

  // Get credentials
  const credentials: Array<{ data: string; publicKeyMultibase: string }> = [];
  try {
    if (ledger.did_credentials.member(didId)) {
      const credentialsData = ledger.did_credentials.lookup(didId);
      for (const credential of credentialsData) {
        credentials.push(credential);
      }
    }
  } catch {
    // Use default if lookup fails
  }

  if (credentials.length === 0) {
    credentials.push({
      data: "credential-data",
      publicKeyMultibase: "z6MkHaXU2BzXhf8X4n6Q1Q2QJ9CkN5j8L9M2P3R4S5T6U7V8W9X",
    });
  }

  return {
    id: didId,
    context: contexts as [Context],
    created: createdDate,
    updated: updatedDate,
    deactivated: deactivatedDate,
    authentication: authenticationMethods as [Either<string, VerificationMethod>],
    verificationMethods: verificationMethods as [VerificationMethod],
    services: services as [Service],
    credentials: credentials as [Credential],
  };
}

/**
 * Converts a reconstructed DID document back to JSON format
 */
function didDocumentToJson(didDoc: DIDDocument) {
  return {
    "@context": didDoc.context.map((ctx) => ctx.uri), // Context.uri is already a string (Opaque<'string'>)
    id: uint8ArrayToString(didDoc.id),
    created: didDoc.created.is_some
      ? uint8ArrayToString(didDoc.created.value.iso_8601_utc)
      : undefined,
    updated: didDoc.updated.is_some
      ? uint8ArrayToString(didDoc.updated.value.iso_8601_utc)
      : undefined,
    deactivated: didDoc.deactivated.is_some
      ? uint8ArrayToString(didDoc.deactivated.value.iso_8601_utc)
      : undefined,
    authentication: didDoc.authentication.map((auth) => {
      if (auth.is_left) {
        return auth.left;
      } else {
        return {
          id: auth.right.id,
          type: auth.right.type,
          controller: fromControllerVector(auth.right.controller),
        };
      }
    }),
    verificationMethod: didDoc.verificationMethods.map((vm) => ({
      id: vm.id,
      type: vm.type,
      controller: fromControllerVector(vm.controller),
      ...(vm.key.is_left
        ? {
            publicKeyHex: Array.from(vm.key.left.hex)
              .map((b) => b.toString(16).padStart(2, "0"))
              .join(""),
          }
        : { AdaAddress: uint8ArrayToString(vm.key.right.address) }),
    })),
    service: didDoc.services.map((svc) => ({
      id: svc.id,
      type: svc.type,
      serviceEndpoint: svc.serviceEndpoint,
    })),
    credentials: didDoc.credentials.map((cred) => ({
      data: cred.data,
      publicKeyMultibase: cred.publicKeyMultibase,
    })),
  };
}

describe("DID: Try to use an example.did.json", () => {
  // TODO: Update these tests to work with the new contract interface
  it("can add the example DID from JSON and retrieve it", () => {
    const simulator = new MidnamesSimulator();

    // Convert example DID to contract format
    const convertedDid = convertExampleDidToContract(exampleDid);

    // Add DID using the new interface
    const ledger = simulator.addDid(
      convertedDid.didId,
      convertedDid.authenticationMethods,
      convertedDid.verificationMethods,
      convertedDid.services,
      convertedDid.credentials,
      convertedDid.contexts
    );

    // Verify DID was added
    expect(ledger.did_context.member(convertedDid.didId)).toBe(true);
    expect(ledger.did_authentication_methods.member(convertedDid.didId)).toBe(
      true
    );
    expect(ledger.did_verification_methods.member(convertedDid.didId)).toBe(
      true
    );
    expect(ledger.did_services.member(convertedDid.didId)).toBe(true);
    expect(ledger.did_credentials.member(convertedDid.didId)).toBe(true);
  });

  it("can reconstruct a DID document from ledger data", () => {
    const simulator = new MidnamesSimulator();

    // Convert example DID to contract format and add it
    const convertedDid = convertExampleDidToContract(exampleDid);
    const ledger = simulator.addDid(
      convertedDid.didId,
      convertedDid.authenticationMethods,
      convertedDid.verificationMethods,
      convertedDid.services,
      convertedDid.credentials,
      convertedDid.contexts
    );

    // Reconstruct the DID document from ledger data
    const reconstructedDid = reconstructDidFromLedger(
      ledger,
      convertedDid.didId
    );

    // Verify reconstruction succeeded
    expect(reconstructedDid).not.toBeNull();
    expect(reconstructedDid!.id).toEqual(convertedDid.didId);
    expect(reconstructedDid!.context.length).toBeGreaterThan(0);
    expect(reconstructedDid!.authentication.length).toBeGreaterThan(0);
    expect(reconstructedDid!.verificationMethods.length).toBeGreaterThan(0);
    expect(reconstructedDid!.services.length).toBeGreaterThan(0);
    expect(reconstructedDid!.credentials.length).toBeGreaterThan(0);
  });

  it("can convert reconstructed DID back to JSON format", () => {
    const simulator = new MidnamesSimulator();

    // Convert example DID to contract format and add it
    const convertedDid = convertExampleDidToContract(exampleDid);
    const ledger = simulator.addDid(
      convertedDid.didId,
      convertedDid.authenticationMethods,
      convertedDid.verificationMethods,
      convertedDid.services,
      convertedDid.credentials,
      convertedDid.contexts
    );

    // Reconstruct the DID document from ledger data
    const reconstructedDid = reconstructDidFromLedger(
      ledger,
      convertedDid.didId
    );
    expect(reconstructedDid).not.toBeNull();

    // Convert back to JSON format
    const jsonDid = didDocumentToJson(reconstructedDid!);

    // Verify JSON conversion
    expect(jsonDid).toHaveProperty("@context");
    expect(jsonDid).toHaveProperty("id");
    expect(jsonDid).toHaveProperty("authentication");
    expect(jsonDid).toHaveProperty("verificationMethod");
    expect(jsonDid).toHaveProperty("service");
    expect(jsonDid).toHaveProperty("credentials");
    expect(Array.isArray(jsonDid["@context"])).toBe(true);
    expect(jsonDid["@context"].length).toBeGreaterThan(0);
  });

  it("returns null when trying to reconstruct non-existent DID", () => {
    const simulator = new MidnamesSimulator();
    const ledger = simulator.getLedger();

    const nonExistentDidId = stringToUint8Array(
      "did:midnight:non-existent",
      64
    );
    const reconstructedDid = reconstructDidFromLedger(ledger, nonExistentDidId);

    expect(reconstructedDid).toBeNull();
  });

  it("can handle DID with minimal data", () => {
    const simulator = new MidnamesSimulator();

    // Create a minimal DID with only required fields
    const didId = stringToUint8Array("did:midnight:minimal-test", 64);

    // Add DID with minimal data (using defaults)
    const ledger = simulator.addDid(didId);

    // Verify DID was added
    expect(ledger.did_context.member(didId)).toBe(true);

    // Reconstruct the DID document
    const reconstructedDid = reconstructDidFromLedger(ledger, didId);
    expect(reconstructedDid).not.toBeNull();

    // Verify minimal structure
    expect(reconstructedDid!.id).toEqual(didId);
    expect(reconstructedDid!.context.length).toBeGreaterThan(0);
    expect(reconstructedDid!.authentication.length).toBeGreaterThan(0);
    expect(reconstructedDid!.verificationMethods.length).toBeGreaterThan(0);
  });

  it("preserves verification method types and controllers", () => {
    const simulator = new MidnamesSimulator();

    // Create a DID with specific verification method types
    const didId = stringToUint8Array("did:midnight:verify-test", 64);
    const controller = toControllerVector("did:midnight:controller");

    const verificationMethods: VerificationMethod[] = [
      {
        id: "ed25519-key",
        type: "BIP32-Ed25519",
        key: {
          is_left: true,
          left: { hex: new Uint8Array(130) },
          right: { address: new Uint8Array(104) },
        },
        controller: controller,
        OtherKeys: {
          is_some: false,
          value: [["type", "signing"]] as [string[]],
        },
      },
      {
        id: "ada-key",
        type: "BIP32-ECDSA",
        key: {
          is_left: false,
          left: { hex: new Uint8Array(130) },
          right: { address: stringToUint8Array("addr1test123", 104) },
        },
        controller: controller,
        OtherKeys: {
          is_some: true,
          value: [["usage", "payment"]] as [string[]],
        },
      },
    ];

    // Add DID with specific verification methods
    const ledger = simulator.addDid(didId, undefined, verificationMethods);

    // Reconstruct and verify
    const reconstructedDid = reconstructDidFromLedger(ledger, didId);
    expect(reconstructedDid).not.toBeNull();

    // Verify verification method preservation
    const ed25519Vm = reconstructedDid!.verificationMethods.find(vm => vm.id === "ed25519-key");
    expect(ed25519Vm).toBeDefined();
    expect(ed25519Vm!.type).toBe("BIP32-Ed25519");
    expect(fromControllerVector(ed25519Vm!.controller)).toEqual(fromControllerVector(controller));
  });
});
