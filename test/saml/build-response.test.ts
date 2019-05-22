/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { generateKeyPairSync } from 'crypto';
import { DOMParser } from 'xmldom';
import { SignedXml, xpath } from 'xml-crypto';
import buildAssertion, { SamlAssertionParams } from '../../src/saml/build-assertion';
import buildResponse from '../../src/saml/build-response';

jest.mock('../../src/saml/build-assertion');
(buildAssertion as jest.Mock).mockImplementation(() => '<MockAssertion></MockAssertion>');

const keyPair = generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
  },
});

test('sets correct attributes', () => {
  const params = {
    privateKey: keyPair.privateKey,
    userEmail: 'test@test.test',
    recipientUrl: 'test-recipient-url',
    recipientName: 'test-recipient-name',
    issuer: 'test-issuer',
    inResponseTo: 'test-request-id',
    validDaysBefore: 2,
    validDaysAfter: 2,
  };

  const now = new Date();
  const response = buildResponse(params);
  const parser = new DOMParser();
  const doc = parser.parseFromString(response, 'application/xml');

  expect(doc.documentElement.getAttribute('ID')).not.toBeNull();
  expect(doc.documentElement.getAttribute('Destination')).toEqual(params.recipientName);
  expect(doc.documentElement.getAttribute('InResponseTo')).toEqual(params.inResponseTo);

  expect(doc.documentElement.getAttribute('IssueInstant')).not.toBeNull();
  const responseIssueInstant = new Date(doc.documentElement.getAttribute('IssueInstant') as string);
  expect(isLessThanOneSecondApart(responseIssueInstant, now)).toBe(true);
});

test('provides default values', () => {
  const params = {
    privateKey: keyPair.privateKey,
    userEmail: 'test@test.test',
    recipientUrl: 'test-recipient-url',
    recipientName: 'test-recipient-name',
    issuer: 'test-issuer',
  };

  const response = buildResponse(params);
  const buildAssertionMock = buildAssertion as jest.Mock;
  const buildAssertionParams: SamlAssertionParams =
    buildAssertionMock.mock.calls[buildAssertionMock.mock.calls.length - 1][0];
  expect(buildAssertionParams.inResponseTo).toBeDefined();
  expect(buildAssertionParams.validDaysBefore).toEqual(0);
  expect(buildAssertionParams.validDaysAfter).toEqual(1);
});

test('inserts assertion as the last child', () => {
  const params = {
    privateKey: keyPair.privateKey,
    userEmail: 'test@test.test',
    recipientUrl: 'test-recipient-url',
    recipientName: 'test-recipient-name',
    issuer: 'test-issuer',
  };

  const response = buildResponse(params);
  const parser = new DOMParser();
  const doc = parser.parseFromString(response, 'application/xml');

  const lastChild = doc.documentElement.lastChild;
  expect(lastChild).not.toBeNull();
  expect((lastChild as Node).nodeName).toEqual('MockAssertion');
});

test('signature can be verified', () => {
  const params = {
    privateKey: keyPair.privateKey,
    userEmail: 'test@test.test',
    recipientUrl: 'test-recipient-url',
    recipientName: 'test-recipient-name',
    issuer: 'test-issuer',
  };

  const response = buildResponse(params);
  const parser = new DOMParser();
  const doc = parser.parseFromString(response, 'application/xml');

  const signature = xpath(
    doc,
    "/*/*[local-name(.)='Signature' and namespace-uri(.)='http://www.w3.org/2000/09/xmldsig#']",
  )[0];
  const sig = new SignedXml();
  sig.keyInfoProvider = {
    getKey: () => keyPair.publicKey,
    getKeyInfo: () => {
      throw 'not implemented';
    },
  };
  sig.loadSignature(signature);
  expect(sig.checkSignature(response)).toBe(true);
});

function isLessThanOneSecondApart(a: Date, b: Date): boolean {
  const distance = Math.abs(a.getTime() - b.getTime());
  return distance < 1000;
}
