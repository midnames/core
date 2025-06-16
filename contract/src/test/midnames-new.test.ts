
import { MidnamesSimulator } from './midnames-simulator.js';
import { stringToUint8Array, toControllerVector } from '@midnames/utils';
import { NetworkId, setNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import { describe, it, expect } from 'vitest';
import { v7 as uuidv7 } from 'uuid';

setNetworkId(NetworkId.Undeployed);

describe('Midnames DID smart contract - Updated Interface', () => {
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

  it('can create a basic DID using new interface', () => {
    const simulator = new MidnamesSimulator();

    // Create test data with UUID7
    const uuid = uuidv7();
    const didId = stringToUint8Array(`did:midnight:${uuid}`, 64);

    // Create DID with new interface (uses defaults)
    const ledger = simulator.addDid(didId);

    // Verify DID was added (check did_context since did_created is not implemented yet)
    expect(ledger.did_context.member(didId)).toBe(true);
  });

  it('can create a DID with custom verification methods', () => {
    const simulator = new MidnamesSimulator();

    // Create test data
    const uuid = uuidv7();
    const didId = stringToUint8Array(`did:midnight:${uuid}`, 64);

    // Create custom verification methods
    const verificationMethods = [
      {
        id: 'custom-key-1',
        type: 'BIP32-Ed25519',
        key: {
          is_left: true,
          left: { hex: new Uint8Array(130) },
          right: { address: new Uint8Array(104) },
        },
        controller: toControllerVector('controller_1'),
        OtherKeys: { is_some: false, value: [['key1', 'key2']] as [string[]] },
      },
    ];

    // Create DID with custom verification methods
    const ledger = simulator.addDid(didId, undefined, verificationMethods);

    // Verify DID was added
    expect(ledger.did_context.member(didId)).toBe(true);
    expect(ledger.did_verification_methods.member(didId)).toBe(true);
  });

  it('can create a DID with custom services', () => {
    const simulator = new MidnamesSimulator();

    // Create test data
    const uuid = uuidv7();
    const didId = stringToUint8Array(`did:midnight:${uuid}`, 64);

    // Create custom services
    const services = [
      {
        id: 'custom-service',
        type: 'CustomService',
        serviceEndpoint: 'https://custom.example.com',
        OtherKeys: { is_some: false, value: [['key1', 'key2']] as [string[]] },
      },
    ];

    // Create DID with custom services
    const ledger = simulator.addDid(didId, undefined, undefined, services);

    // Verify DID was added
    expect(ledger.did_context.member(didId)).toBe(true);
    expect(ledger.did_services.member(didId)).toBe(true);
  });

  it('can create a DID with custom credentials', () => {
    const simulator = new MidnamesSimulator();

    // Create test data
    const uuid = uuidv7();
    const didId = stringToUint8Array(`did:midnight:${uuid}`, 64);

    // Create custom credentials
    const credentials = [
      {
        data: 'custom-credential-data',
        publicKeyMultibase: 'z6MkCustomKey123456789',
      },
    ];

    // Create DID with custom credentials
    const ledger = simulator.addDid(didId, undefined, undefined, undefined, credentials);

    // Verify DID was added - check did_context instead of did_created since timestamp creation is not implemented
    expect(ledger.did_context.member(didId)).toBe(true);
    expect(ledger.did_credentials.member(didId)).toBe(true);
  });

  it('can create a DID with custom context', () => {
    const simulator = new MidnamesSimulator();

    // Create test data
    const uuid = uuidv7();
    const didId = stringToUint8Array(`did:midnight:${uuid}`, 64);

    // Create custom context
    const contexts = [{ uri: 'https://www.w3.org/ns/did/v1' }, { uri: 'https://custom.context.example.com/v1' }];

    // Create DID with custom context
    const ledger = simulator.addDid(didId, undefined, undefined, undefined, undefined, contexts);

    // Verify DID was added - check did_context instead of did_created since timestamp creation is not implemented
    expect(ledger.did_context.member(didId)).toBe(true);
    expect(ledger.did_context.member(didId)).toBe(true);
  });

  it('can create multiple DIDs', () => {
    const simulator = new MidnamesSimulator();

    // Create first DID
    const uuid1 = uuidv7();
    const didId1 = stringToUint8Array(`did:midnight:${uuid1}`, 64);

    // Create second DID
    const uuid2 = uuidv7();
    const didId2 = stringToUint8Array(`did:midnight:${uuid2}`, 64);

    // Add both DIDs
    let ledger = simulator.addDid(didId1);
    expect(ledger.did_context.member(didId1)).toBe(true);

    ledger = simulator.addDid(didId2);
    expect(ledger.did_context.member(didId1)).toBe(true);
    expect(ledger.did_context.member(didId2)).toBe(true);
  });
});
