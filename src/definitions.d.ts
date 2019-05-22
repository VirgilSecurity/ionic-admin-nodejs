declare module 'xml-crypto' {
  export interface ComputeSignatureOptions {
    prefix?: string;
    attrs?: { [attrName: string]: string };
    location?: { reference: string; action: 'append' | 'prepend' | 'before' | 'after' };
    existingPrefixes?: { [prefix: string]: string };
  }

  export interface KeyInfoProvider {
    getKeyInfo(key: string, prefix: string): string;
    getKey(keyInfo: any): Buffer | string;
  }

  export class SignedXml {
    signingKey: string | Buffer;
    signatureAlgorithm: string;
    canonicalizationAlgorithm: string;
    keyInfoProvider?: KeyInfoProvider;
    validationErrors: string[];
    addReference(xpath: string, transforms?: string[], digestAlgorithm?: string): void;
    computeSignature(xml: string, options?: ComputeSignatureOptions): void;
    getSignedXml(): string;
    getSignatureXml(): string;
    getOriginalXmlWithIds(): string;
    loadSignature(signatureXml: string | Node): void;
    checkSignature(xml: string): boolean;
  }

  export class FileKeyInfo implements KeyInfoProvider {
    constructor(file: string);
    getKeyInfo(key: string, prefix: string): string;
    getKey(keyInfo: any): Buffer;
  }

  export function xpath(doc: XMLDocument, xpath: string): Node[];
}
