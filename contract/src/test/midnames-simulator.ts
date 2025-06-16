
import {
  type CircuitContext,
  QueryContext,
  sampleContractAddress,
  constructorContext,
} from '@midnight-ntwrk/compact-runtime';
import {
  Contract,
  type Ledger,
  ledger,
  type Context,
  type VerificationMethod,
  type Either,
  type Service,
  type Credential,
  type Maybe,
} from '../managed/midnames/contract/index.cjs';
import { type MidnamesPrivateState, witnesses, createMidnamesSecretState } from '../witnesses.js';
import { toControllerVector } from '@midnames/utils';

export class MidnamesSimulator {
  readonly contract: Contract<MidnamesPrivateState>;
  circuitContext: CircuitContext<MidnamesPrivateState>;

  constructor() {
    this.contract = new Contract<MidnamesPrivateState>(witnesses);
    const initialPrivateState = createMidnamesSecretState(
      new Uint8Array(32), // local_secret_key
      [new Uint8Array(32), new Uint8Array(32), new Uint8Array(32), new Uint8Array(32), new Uint8Array(32)], // multiple_local_secret_keys
    );
    const { currentPrivateState, currentContractState, currentZswapLocalState } = this.contract.initialState(
      constructorContext(initialPrivateState, '0'.repeat(64)),
      { uri: 'https://www.w3.org/ns/did/v1' },
    );
    this.circuitContext = {
      currentPrivateState,
      currentZswapLocalState,
      originalState: currentContractState,
      transactionContext: new QueryContext(currentContractState.data, sampleContractAddress()),
    };
  }

  public getLedger(): Ledger {
    return ledger(this.circuitContext.transactionContext.state);
  }

  public getPrivateState(): MidnamesPrivateState {
    return this.circuitContext.currentPrivateState;
  }

  private createContext(uri: string): Context {
    return { uri };
  }

  private createDefaultVerificationMethod(): VerificationMethod {
    return {
      id: 'keys-1',
      type: 'BIP32-Ed25519',
      key: {
        is_left: true,
        left: { hex: new Uint8Array(130) },
        right: { address: new Uint8Array(104) },
      },
      controller: toControllerVector(""),
      OtherKeys: { is_some: false, value: [['key1', 'key2']] as [string[]] },
    };
  }

  private createDefaultAuthMethod(): Either<string, VerificationMethod> {
    return {
      is_left: true,
      left: 'keys-1',
      right: this.createDefaultVerificationMethod(),
    };
  }

  private createDefaultService(): Service {
    return {
      id: 'service-1',
      type: 'DIDCommMessaging',
      serviceEndpoint: 'https://example.com/endpoint',
      OtherKeys: { is_some: false, value: [['key1', 'key2']] as [string[]] },
    };
  }

  private createDefaultCredential(): Credential {
    return {
      data: 'credential-data',
      publicKeyMultibase: 'z6MkHaXU2BzXhf8X4n6Q1Q2QJ9CkN5j8L9M2P3R4S5T6U7V8W9X',
    };
  }

  public addDid(
    didId: Uint8Array,
    authenticationMethods?: Either<string, VerificationMethod>[],
    verificationMethods?: VerificationMethod[],
    services?: Service[],
    credentials?: Credential[],
    context?: Context[],
    authorizedPublicAddresses?: Uint8Array[],
  ): Ledger {
    const finalContext = context && context.length > 0 ? context : [this.createContext('https://www.w3.org/ns/did/v1')];
    const finalAuthMethods =
      authenticationMethods && authenticationMethods.length > 0
        ? authenticationMethods
        : [this.createDefaultAuthMethod()];
    const finalVerificationMethods =
      verificationMethods && verificationMethods.length > 0
        ? verificationMethods
        : [this.createDefaultVerificationMethod()];
    const finalServices = services && services.length > 0 ? services : [this.createDefaultService()];
    const finalCredentials = credentials && credentials.length > 0 ? credentials : [this.createDefaultCredential()];
    const finalAuthorizedAddresses =
      authorizedPublicAddresses && authorizedPublicAddresses.length > 0
        ? authorizedPublicAddresses
        : [new Uint8Array(32)];

    // Convert arrays to Vector<5, Maybe<T>> format required by new circuit interface
    const authVector: Array<Maybe<Either<string, VerificationMethod>>> = [];
    const verificationVector: Array<Maybe<VerificationMethod>> = [];
    const serviceVector: Array<Maybe<Service>> = [];
    const credentialVector: Array<Maybe<Credential>> = [];
    const contextVector: Array<Maybe<Context>> = [];
    const addressVector: Array<Maybe<Uint8Array>> = [];

    // Fill vectors with up to 5 items each
    for (let i = 0; i < 5; i++) {
      authVector.push(
        i < finalAuthMethods.length ? { is_some: true, value: finalAuthMethods[i] } : { is_some: false, value: this.createDefaultAuthMethod() }
      );
      verificationVector.push(
        i < finalVerificationMethods.length ? { is_some: true, value: finalVerificationMethods[i] } : { is_some: false, value: this.createDefaultVerificationMethod() }
      );
      serviceVector.push(
        i < finalServices.length ? { is_some: true, value: finalServices[i] } : { is_some: false, value: this.createDefaultService() }
      );
      credentialVector.push(
        i < finalCredentials.length ? { is_some: true, value: finalCredentials[i] } : { is_some: false, value: this.createDefaultCredential() }
      );
      contextVector.push(
        i < finalContext.length ? { is_some: true, value: finalContext[i] } : { is_some: false, value: this.createContext('') }
      );
      addressVector.push(
        i < finalAuthorizedAddresses.length ? { is_some: true, value: finalAuthorizedAddresses[i] } : { is_some: false, value: new Uint8Array(32) }
      );
    }

    this.circuitContext = this.contract.impureCircuits.create_did(
      this.circuitContext,
      didId,
      authVector as [Maybe<Either<string, VerificationMethod>>, Maybe<Either<string, VerificationMethod>>, Maybe<Either<string, VerificationMethod>>, Maybe<Either<string, VerificationMethod>>, Maybe<Either<string, VerificationMethod>>],
      verificationVector as [Maybe<VerificationMethod>, Maybe<VerificationMethod>, Maybe<VerificationMethod>, Maybe<VerificationMethod>, Maybe<VerificationMethod>],
      serviceVector as [Maybe<Service>, Maybe<Service>, Maybe<Service>, Maybe<Service>, Maybe<Service>],
      credentialVector as [Maybe<Credential>, Maybe<Credential>, Maybe<Credential>, Maybe<Credential>, Maybe<Credential>],
      contextVector as [Maybe<Context>, Maybe<Context>, Maybe<Context>, Maybe<Context>, Maybe<Context>],
      addressVector as [Maybe<Uint8Array>, Maybe<Uint8Array>, Maybe<Uint8Array>, Maybe<Uint8Array>, Maybe<Uint8Array>],
    ).context;

    return ledger(this.circuitContext.transactionContext.state);
  }
}
