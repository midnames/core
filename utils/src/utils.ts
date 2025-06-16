/**
 * Converts a string to a Uint8Array with a specific length
 * @param str - The string to convert
 * @param length - The desired length of the resulting array
 * @returns A Uint8Array representation of the string
 */
export const stringToUint8Array = (str: string, length: number): Uint8Array => {
  const encoder = new TextEncoder();
  const encoded = encoder.encode(str);

  if (encoded.length > length) {
    throw new Error(
      `String is too long. Expected max ${length} bytes, got ${encoded.length}`
    );
  }

  const result = new Uint8Array(length);
  result.set(encoded);
  return result;
};

/**
 * Parses a hex string to a Uint8Array public key (contract format - 130 bytes)
 * @param hexString - The hex string to parse (with or without 0x prefix)
 * @returns A Uint8Array representation of the public key (130 bytes)
 */
export const parsePublicKeyHex = (hexString: string): Uint8Array => {
  // Remove 0x prefix if present
  const cleanHex = hexString.startsWith("0x") ? hexString.slice(2) : hexString;
  const arr = new Uint8Array(130); // Contract expects 130 bytes
  for (let i = 0; i < cleanHex.length && i < 260; i += 2) {
    const byteIndex = i / 2;
    const hexByte = cleanHex.substr(i, 2);
    arr[byteIndex] = parseInt(hexByte, 16);
  }
  return arr;
};

/**
 * Parses an ADA address string to a Uint8Array (contract format - 104 bytes)
 * @param address - The ADA address string to parse
 * @returns A Uint8Array representation of the address (104 bytes)
 */
export const parseAdaAddress = (address: string): Uint8Array => {
  const arr = new Uint8Array(104); // Contract expects 104 bytes
  const encoded = new Uint8Array(Buffer.from(address, "utf8"));
  for (let i = 0; i < encoded.length && i < 104; i++) {
    arr[i] = encoded[i];
  }
  return arr;
};

/**
 * Converts a Uint8Array to a hex string
 * @param bytes - The bytes to convert
 * @returns A hex string representation
 */
export const uint8ArrayToHex = (bytes: Uint8Array): string => {
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
};

/**
 * Validates if a string is a valid hex string
 * @param str - The string to validate
 * @returns True if the string is valid hex
 */
export const isValidHex = (str: string): boolean => {
  const cleanStr = str.startsWith("0x") ? str.slice(2) : str;
  return /^[0-9a-fA-F]*$/.test(cleanStr) && cleanStr.length % 2 === 0;
};

/**
 * Converts a Uint8Array to string (trimming null bytes)
 * @param arr - The Uint8Array to convert
 * @returns A string representation trimmed of null bytes
 */
export const uint8ArrayToString = (arr: Uint8Array): string => {
  const nullIndex = arr.indexOf(0);
  const validBytes = nullIndex >= 0 ? arr.slice(0, nullIndex) : arr;
  const decoder = new globalThis.TextDecoder();
  return decoder.decode(validBytes);
};

/**
 * Helper function to convert arrays to exactly 5-element Maybe arrays (as required by the circuit)
 * @param items - The array of items to convert
 * @param defaultValue - The default value to use for missing items
 * @returns An array of exactly 5 Maybe objects
 */
export function toVector5Maybes<T>(items: T[], defaultValue: T): any {
  const result: any[] = [];

  for (let i = 0; i < Math.min(items.length, 5); i++) {
    result.push({ is_some: true, value: items[i] });
  }

  while (result.length < 5) {
    result.push({ is_some: false, value: defaultValue });
  }

  return result;
}

/**
 * Helper function to convert Uint8Array to readable format
 * @param arr - The Uint8Array to format
 * @returns A hex string representation of meaningful bytes
 */
export const formatUint8Array = (arr: Uint8Array): string => {
  // Find the last non-zero byte to avoid padding zeros
  let lastNonZero = arr.length - 1;
  while (lastNonZero >= 0 && arr[lastNonZero] === 0) {
    lastNonZero--;
  }

  // Only format up to the last meaningful byte
  const meaningfulBytes = arr.slice(0, lastNonZero + 1);
  return Array.from(meaningfulBytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
};

/**
 * Converts controller data to Vector<5, Bytes<64>> format for the contract
 * @param controllers - Array of controller strings or single controller string
 * @returns A Vector<5, Bytes<64>> with up to 5 controllers
 */
export const toControllerVector = (
  controllers: string | string[]
): Uint8Array[] => {
  const controllerArray = Array.isArray(controllers)
    ? controllers
    : [controllers];
  const result: Uint8Array[] = [];

  // Add up to 5 controllers
  for (let i = 0; i < Math.min(controllerArray.length, 5); i++) {
    result.push(stringToUint8Array(controllerArray[i], 64));
  }

  // Fill remaining slots with empty 64-byte arrays
  while (result.length < 5) {
    result.push(new Uint8Array(64));
  }

  return result;
};

/**
 * Converts a Vector<5, Bytes<64>> controller back to string array
 * @param controllerVector - The controller vector from the contract
 * @returns Array of controller strings (excluding empty ones)
 */
export const fromControllerVector = (
  controllerVector: Uint8Array[]
): string[] => {
  return controllerVector
    .map((controller) => uint8ArrayToString(controller))
    .filter((controller) => controller.length > 0);
};

/**
 * Helper function to format DID data to W3C DID Document standard
 * @param didData - The raw DID data from the contract
 * @returns A formatted W3C DID Document
 */
export const formatDidData = (didData: any): any => {
  // Convert verification methods to W3C DID format
  const verificationMethod = didData.verificationMethods.map((vm: any) => {
    const fullId = `${didData.id}#${vm.id}`;
    const controllers = fromControllerVector(vm.controller);
    const baseMethod = {
      id: fullId,
      type: vm.type,
      controller: controllers.length === 1 ? controllers[0] : controllers,
    };

    // key format based on the Either type
    if (vm.key.is_left) {
      // PublicKeyHex format
      return {
        ...baseMethod,
        publicKeyHex: `0x${formatUint8Array(vm.key.left.hex)}`,
      };
    } else {
      // AdaAddress format
      return {
        ...baseMethod,
        AdaAddress: uint8ArrayToString(vm.key.right.address),
      };
    }
  });

  // Convert authentication methods to W3C DID format
  const authentication = didData.authenticationMethods.map((auth: any) => {
    if (auth.is_left) {
      // Reference to verification method
      return `${didData.id}#${auth.left}`;
    } else {
      // Embedded verification method
      const fullId = `${didData.id}#${auth.right.id}`;
      const controllers = fromControllerVector(auth.right.controller);
      const baseMethod = {
        id: fullId,
        type: auth.right.type,
        controller: controllers.length === 1 ? controllers[0] : controllers,
      };

      // key format
      if (auth.right.key.is_left) {
        return {
          ...baseMethod,
          publicKeyHex: `0x${formatUint8Array(auth.right.key.left.hex)}`,
        };
      } else {
        return {
          ...baseMethod,
          AdaAddress: uint8ArrayToString(auth.right.key.right.address),
        };
      }
    }
  });

  // Convert services to W3C DID format
  const service = didData.services.map((svc: any) => ({
    id: `${didData.id}#${svc.id}`,
    type: svc.type,
    serviceEndpoint: svc.serviceEndpoint,
  }));

  // Convert context to W3C DID format (array of URIs)
  const context = didData.context.map((ctx: any) => ctx.uri);

  // Build the W3C DID Document
  return {
    "@context": context,
    id: didData.id,
    verificationMethod,
    authentication,
    service,
    credentials: didData.credentials.map((cred: any) => ({
      data: cred.data,
      publicKeyMultibase: cred.publicKeyMultibase,
    })),
    // Additional metadata (not part of standard DID but useful for debugging)
    _metadata: {
      authorizedControllers: didData.authorizedControllers.map(
        (controller: any) => `0x${formatUint8Array(controller)}`
      ),
      exists: didData.exists,
    },
  };
};
