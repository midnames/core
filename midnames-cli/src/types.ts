export interface DidJsonDocument {
  id: string;
  context?: string[];
  "@context"?: string[];
  verificationMethod?: Array<{
    id: string;
    type: string;
    controller: string;
    publicKeyHex?: string;
    AdaAddress?: string;
    publicKeyMultibase?: string;
  }>;
  authentication?: Array<
    | string
    | {
        id: string;
        type: string;
        controller: string | string[];
        publicKeyMultibase?: string;
        publicKeyHex?: string;
        AdaAddress?: string;
      }
  >;
  service?: Array<{
    id: string;
    type: string;
    serviceEndpoint: string;
  }>;
  credentials?: Array<{
    data: string;
    publicKeyMultibase: string;
  }>;
  updated?: string;
}