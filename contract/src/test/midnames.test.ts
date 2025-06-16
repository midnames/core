import { MidnamesSimulator } from './midnames-simulator.js';
import { stringToUint8Array, toControllerVector } from '@midnames/utils';
import { NetworkId, setNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import { describe, it, expect } from 'vitest';
import { v7 as uuidv7 } from 'uuid';

setNetworkId(NetworkId.Undeployed);

describe('Midnames DID smart contract', () => {
  it('generates initial ledger state deterministically', () => {
    const simulator0 = new MidnamesSimulator();
    const simulator1 = new MidnamesSimulator();
    const ledger0 = simulator0.getLedger();
    const ledger1 = simulator1.getLedger();

    // Compare the actual values instead of object references
    expect(ledger0.did_context.isEmpty()).toEqual(ledger1.did_context.isEmpty());
    expect(ledger0.did_verification_methods.isEmpty()).toEqual(ledger1.did_verification_methods.isEmpty());
    expect(ledger0.did_authentication_methods.isEmpty()).toEqual(ledger1.did_authentication_methods.isEmpty());
  });

  it('can add a DID to the ledger', () => {
    const simulator = new MidnamesSimulator();

    // Create test data with UUID7
    const uuid = uuidv7();
    const didId = stringToUint8Array(`did:midnight:${uuid}`, 64);

    // Add DID to ledger with new interface
    const ledger = simulator.addDid(didId);

    // Verify DID was added - check did_context since it's the main entry point
    expect(ledger.did_context.member(didId)).toBe(true);
    // Verify default context was added
    const contextData = ledger.did_context.lookup(didId);
    const contextArray = Array.from(contextData);
    expect(contextArray.length).toBeGreaterThan(0);
    expect(contextArray[0].uri).toBe('https://www.w3.org/ns/did/v1');
  });

  it('can add a DID with multiple verification methods', () => {
    const simulator = new MidnamesSimulator();

    // Create test data with UUID7
    const uuid = uuidv7();
    const didId = stringToUint8Array(`did:midnight:${uuid}`, 64);

    // Create multiple verification methods
    const verificationMethods = [
      {
        id: 'keys-1',
        type: 'BIP32-Ed25519',
        key: {
          is_left: true,
          left: { hex: new Uint8Array(130) },
          right: { address: new Uint8Array(104) },
        },
        controller: toControllerVector('controller_1'),
        OtherKeys: { is_some: false, value: [['key1', 'key2']] as [string[]] },
      },
      {
        id: 'keys-2',
        type: 'BIP32-ECDSA',
        key: {
          is_left: false,
          left: { hex: new Uint8Array(130) },
          right: { address: stringToUint8Array('addr_12345', 104) },
        },
        controller: toControllerVector('controller_2'),
        OtherKeys: { is_some: true, value: [['prop1', 'prop2']] as [string[]] },
      },
    ];

    // Add DID with multiple verification methods using new interface
    const ledger = simulator.addDid(
      didId,
      undefined, // use default auth methods
      verificationMethods,
    );

    // Verify DID was added and verification methods are stored
    expect(ledger.did_context.member(didId)).toBe(true);
    expect(ledger.did_verification_methods.member(didId)).toBe(true);
    
    // Verify verification methods content
    const vmData = ledger.did_verification_methods.lookup(didId);
    const vmArray = Array.from(vmData);
    expect(vmArray.length).toBe(2);
    
    // Find verification methods by ID (order may vary)
    const keys1VM = vmArray.find(vm => vm.id === 'keys-1');
    const keys2VM = vmArray.find(vm => vm.id === 'keys-2');
    
    expect(keys1VM).toBeDefined();
    expect(keys1VM!.type).toBe('BIP32-Ed25519');
    expect(keys2VM).toBeDefined();
    expect(keys2VM!.type).toBe('BIP32-ECDSA');
  });

  it('can add a DID with multiple services', () => {
    const simulator = new MidnamesSimulator();

    // Create test data with UUID7
    const uuid = uuidv7();
    const didId = stringToUint8Array(`did:midnight:${uuid}`, 64);

    // Create multiple services
    const services = [
      {
        id: 'didcomm-service',
        type: 'DIDCommMessaging',
        serviceEndpoint: 'https://example.com/didcomm',
        OtherKeys: { is_some: false, value: [['key1', 'key2']] as [string[]] },
      },
      {
        id: 'credential-service',
        type: 'VerifiableCredentialService',
        serviceEndpoint: 'https://example.com/credentials',
        OtherKeys: {
          is_some: true,
          value: [['priority', 'high']] as [string[]],
        },
      },
      {
        id: 'linked-domains',
        type: 'LinkedDomains',
        serviceEndpoint: 'https://company.example.com',
        OtherKeys: { is_some: false, value: [['key1', 'key2']] as [string[]] },
      },
    ];

    // Add DID with multiple services using new interface
    const ledger = simulator.addDid(
      didId,
      undefined, // use default auth methods
      undefined, // use default verification methods
      services,
    );

    // Verify DID was added - check did_context instead of did_created since timestamp creation is not implemented
    expect(ledger.did_context.member(didId)).toBe(true);
    expect(ledger.did_services.member(didId)).toBe(true);
  });

  it('can add a DID with multiple credentials', () => {
    const simulator = new MidnamesSimulator();

    // Create test data with UUID7
    const uuid = uuidv7();
    const didId = stringToUint8Array(`did:midnight:${uuid}`, 64);

    // Create multiple credentials
    const credentials = [
      {
        data: 'cred-1',
        publicKeyMultibase: 'z6MkHaXU2BzXhf8X4n6Q1Q2QJ9CkN5j8L9M2P3R4S5T6U7V8W9X',
      },
      {
        data: 'cred-2',
        publicKeyMultibase: 'z6MkiY2cmkXyGKcGdP8JR7wHF4nK3K1QhM9j8L0P2Q3R4S5T6U7V',
      },
      {
        data: 'cred-3',
        publicKeyMultibase: 'z6MkpQR4S5T6U7V8W9X0Y1Z2A3B4C5D6E7F8G9H0I1J2K3L4M5N6',
      },
    ];

    // Add DID with multiple credentials using new interface
    const ledger = simulator.addDid(
      didId,
      undefined, // use default auth methods
      undefined, // use default verification methods
      undefined, // use default services
      credentials,
    );

    // Verify DID was added - check did_context instead of did_created since timestamp creation is not implemented
    expect(ledger.did_context.member(didId)).toBe(true);
    expect(ledger.did_credentials.member(didId)).toBe(true);
  });

  it('can add a DID with multiple contexts', () => {
    const simulator = new MidnamesSimulator();

    // Create test data with UUID7
    const uuid = uuidv7();
    const didId = stringToUint8Array(`did:midnight:${uuid}`, 64);

    // Create multiple contexts - note: first must be W3C DID context
    const contexts = [
      {
        uri: 'https://www.w3.org/ns/did/v1',
      },
      {
        uri: 'https://w3id.org/security/v1',
      },
      {
        uri: 'https://example.com/custom-context/v1',
      },
    ];

    // Add DID with multiple contexts using new interface
    const ledger = simulator.addDid(
      didId,
      undefined,
      undefined,
      undefined,
      undefined,
      contexts,
    );

    // Verify DID was added - check did_context instead of did_created since timestamp creation is not implemented
    expect(ledger.did_context.member(didId)).toBe(true);
  });

  it('can add a comprehensive DID with all components', () => {
    const simulator = new MidnamesSimulator();

    // Create test data with UUID7
    const uuid = uuidv7();
    const didId = stringToUint8Array(`did:midnight:${uuid}`, 64);

    // Create multiple authentication methods
    const authenticationMethods = [
      {
        is_left: true,
        left: 'key-1',
        right: {
          id: 'dummy',
          type: 'dummy',
          key: {
            is_left: true,
            left: { hex: new Uint8Array(130) },
            right: { address: new Uint8Array(104) },
          },
          controller: toControllerVector(""),
          OtherKeys: { is_some: false, value: [['key1', 'key2']] as [string[]] },
        },
      },
      {
        is_left: false,
        left: 'dummy-string',
        right: {
          id: 'key-2',
          type: 'BIP32-Ed25519',
          key: {
            is_left: true,
            left: { hex: new Uint8Array(130) },
            right: { address: new Uint8Array(104) },
          },
          controller: toControllerVector('auth_controller'),
          OtherKeys: { is_some: false, value: [['key1', 'key2']] as [string[]] },
        },
      },
    ];

    // Create multiple verification methods with different controllers
    const verificationMethods = [
      {
        id: 'primary-key',
        type: 'BIP32-Ed25519',
        key: {
          is_left: true,
          left: { hex: new Uint8Array(130) },
          right: { address: new Uint8Array(104) },
        },
        controller: toControllerVector(""),
        OtherKeys: { is_some: false, value: [['key1', 'key2']] as [string[]] },
      },
      {
        id: 'backup-key',
        type: 'BIP32-ECDSA',
        key: {
          is_left: false,
          left: { hex: new Uint8Array(130) },
          right: { address: stringToUint8Array('backup_addr', 104) },
        },
        controller: toControllerVector('backup_controller'),
        OtherKeys: { is_some: true, value: [['usage', 'backup']] as [string[]] },
      },
    ];

    // Create multiple services
    const services = [
      {
        id: 'messaging',
        type: 'DIDCommMessaging',
        serviceEndpoint: 'https://messaging.example.com',
        OtherKeys: { is_some: true, value: [['priority', '1']] as [string[]] },
      },
      {
        id: 'storage',
        type: 'DecentralizedWebNode',
        serviceEndpoint: 'https://dwn.example.com',
        OtherKeys: { is_some: false, value: [['key1', 'key2']] as [string[]] },
      },
    ];

    // Create multiple credentials
    const credentials = [
      {
        data: 'some-data-1',
        publicKeyMultibase: 'z6MkHaXU2BzXhf8X4n6Q1Q2QJ9CkN5j8L9M2P3R4S5T6U7V8W9X',
      },
      {
        data: 'some-data-2',
        publicKeyMultibase: 'z6MkiY2cmkXyGKcGdP8JR7wHF4nK3K1QhM9j8L0P2Q3R4S5T6U7V',
      },
    ];

    // Create multiple contexts
    const contexts = [
      {
        uri: 'https://www.w3.org/ns/did/v1',
      },
      {
        uri: 'https://w3id.org/security/v2',
      },
    ];

    // Add comprehensive DID using new interface
    const ledger = simulator.addDid(didId, authenticationMethods, verificationMethods, services, credentials, contexts);

    // Verify all components were added - check did_context instead of did_created since timestamp creation is not implemented
    expect(ledger.did_context.member(didId)).toBe(true);
    expect(ledger.did_authentication_methods.member(didId)).toBe(true);
    expect(ledger.did_verification_methods.member(didId)).toBe(true);
    expect(ledger.did_services.member(didId)).toBe(true);
    expect(ledger.did_credentials.member(didId)).toBe(true);
  });

  it('can add multiple different DIDs to the same ledger', () => {
    const simulator = new MidnamesSimulator();

    // Create first DID
    const uuid1 = uuidv7();
    const didId1 = stringToUint8Array(`did:midnight:${uuid1}`, 64);

    // Create second DID
    const uuid2 = uuidv7();
    const didId2 = stringToUint8Array(`did:midnight:${uuid2}`, 64);

    // Add first DID using new interface
    let ledger = simulator.addDid(didId1);
    expect(ledger.did_context.member(didId1)).toBe(true);

    // Add second DID to same simulator
    ledger = simulator.addDid(didId2);

    // Verify both DIDs exist
    expect(ledger.did_context.member(didId1)).toBe(true);
    expect(ledger.did_context.member(didId2)).toBe(true);
  });

  it('supports CLI create DID workflow with authentication methods', () => {
    const simulator = new MidnamesSimulator();
    
    // Simulate CLI DID creation with UUID7 (as used in CLI)
    const uuid = uuidv7();
    const didId = stringToUint8Array(`did:midnight:${uuid}`, 64);
    
    // Create authentication methods as CLI would
    const authMethods = [
      {
        is_left: true,
        left: 'keys-1', // Reference to verification method
        right: {
          id: 'dummy',
          type: 'dummy',
          key: { is_left: true, left: { hex: new Uint8Array(130) }, right: { address: new Uint8Array(104) } },
          controller: toControllerVector(''),
          OtherKeys: { is_some: false, value: [['', '']] as [string[]] },
        },
      },
    ];
    
    // Create verification methods with public key hex (as CLI supports)
    const verificationMethods = [
      {
        id: 'keys-1',
        type: 'BIP32-Ed25519',
        key: {
          is_left: true,
          left: { hex: new Uint8Array(130) }, // Public key hex format
          right: { address: new Uint8Array(104) },
        },
        controller: toControllerVector(''), // Self-controlled
        OtherKeys: { is_some: false, value: [['', '']] as [string[]] },
      },
    ];
    
    // Create services (as CLI supports)
    const services = [
      {
        id: 'didcomm-service',
        type: 'DIDCommMessaging',
        serviceEndpoint: 'https://example.com/didcomm',
        OtherKeys: { is_some: false, value: [['', '']] as [string[]] },
      },
    ];
    
    // Create credentials (as CLI supports)
    const credentials = [
      {
        data: 'some-data-1',
        publicKeyMultibase: 'z6MkHaXU2BzXhf8X4n6Q1Q2QJ9CkN5j8L9M2P3R4S5T6U7V8W9X',
      },
    ];
    
    // Add DID using simulator (mimics contract deployment)
    const ledger = simulator.addDid(didId, authMethods, verificationMethods, services, credentials);
    
    // Verify DID creation succeeded (as CLI would check)
    expect(ledger.did_context.member(didId)).toBe(true);
    expect(ledger.did_authentication_methods.member(didId)).toBe(true);
    expect(ledger.did_verification_methods.member(didId)).toBe(true);
    expect(ledger.did_services.member(didId)).toBe(true);
    expect(ledger.did_credentials.member(didId)).toBe(true);
    
    // Verify content matches CLI expectations
    const contextArray = Array.from(ledger.did_context.lookup(didId));
    const authArray = Array.from(ledger.did_authentication_methods.lookup(didId));
    const vmArray = Array.from(ledger.did_verification_methods.lookup(didId));
    const serviceArray = Array.from(ledger.did_services.lookup(didId));
    const credArray = Array.from(ledger.did_credentials.lookup(didId));
    
    expect(contextArray[0].uri).toBe('https://www.w3.org/ns/did/v1');
    expect(authArray[0].is_left).toBe(true);
    expect(authArray[0].left).toBe('keys-1');
    expect(vmArray[0].id).toBe('keys-1');
    expect(vmArray[0].type).toBe('BIP32-Ed25519');
    expect(serviceArray[0].type).toBe('DIDCommMessaging');
    expect(credArray[0].data).toBe('some-data-1');
  });

  it('supports CLI lookup DID workflow', () => {
    const simulator = new MidnamesSimulator();
    
    // Create a DID first
    const uuid = uuidv7();
    const didId = stringToUint8Array(`did:midnight:${uuid}`, 64);
    let ledger = simulator.addDid(didId);
    
    // Verify DID exists (CLI lookup functionality)
    expect(ledger.did_context.member(didId)).toBe(true);
    
    // Try to lookup non-existent DID (CLI error handling)
    const nonExistentUuid = uuidv7();
    const nonExistentDidId = stringToUint8Array(`did:midnight:${nonExistentUuid}`, 64);
    expect(ledger.did_context.member(nonExistentDidId)).toBe(false);
  });

  it('supports multiple DID creation for different users', () => {
    const simulator = new MidnamesSimulator();
    
    // Create multiple DIDs with different configurations (multi-user scenario)
    const user1Uuid = uuidv7();
    const user1DidId = stringToUint8Array(`did:midnight:${user1Uuid}`, 64);
    
    const user2Uuid = uuidv7();
    const user2DidId = stringToUint8Array(`did:midnight:${user2Uuid}`, 64);
    
    // Different verification method types
    const user1VM = [{
      id: 'ed25519-key',
      type: 'BIP32-Ed25519',
      key: { is_left: true, left: { hex: new Uint8Array(130) }, right: { address: new Uint8Array(104) } },
      controller: toControllerVector(''),
      OtherKeys: { is_some: false, value: [['', '']] as [string[]] },
    }];
    
    const user2VM = [{
      id: 'ada-key',
      type: 'BIP32-ECDSA',
      key: { is_left: false, left: { hex: new Uint8Array(130) }, right: { address: new Uint8Array(104) } },
      controller: toControllerVector(''),
      OtherKeys: { is_some: false, value: [['', '']] as [string[]] },
    }];
    
    // Add both DIDs
    let ledger = simulator.addDid(user1DidId, undefined, user1VM);
    ledger = simulator.addDid(user2DidId, undefined, user2VM);
    
    // Verify both exist with different configurations
    expect(ledger.did_context.member(user1DidId)).toBe(true);
    expect(ledger.did_context.member(user2DidId)).toBe(true);
    expect(ledger.did_verification_methods.member(user1DidId)).toBe(true);
    expect(ledger.did_verification_methods.member(user2DidId)).toBe(true);
    
    // Verify different verification method types
    const user1VMArray = Array.from(ledger.did_verification_methods.lookup(user1DidId));
    const user2VMArray = Array.from(ledger.did_verification_methods.lookup(user2DidId));
    
    expect(user1VMArray[0].type).toBe('BIP32-Ed25519');
    expect(user2VMArray[0].type).toBe('BIP32-ECDSA');
  });

  it('validates DID format and structure', () => {
    const simulator = new MidnamesSimulator();
    
    // Test valid DID format (as CLI would validate)
    const validUuid = uuidv7();
    const validDidId = stringToUint8Array(`did:midnight:${validUuid}`, 64);
    
    // Test DID creation
    const ledger = simulator.addDid(validDidId);
    expect(ledger.did_context.member(validDidId)).toBe(true);
    
    // Verify default context includes required W3C DID context
    const contextArray = Array.from(ledger.did_context.lookup(validDidId));
    expect(contextArray.some(ctx => ctx.uri === 'https://www.w3.org/ns/did/v1')).toBe(true);
  });
});
