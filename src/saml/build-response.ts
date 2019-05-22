import { randomBytes } from 'crypto';
import { SignedXml, ComputeSignatureOptions } from 'xml-crypto';
import uuid from 'uuid';
import buildAssertion from './build-assertion';
import { removeWhitespace } from './xml-utils';

export interface SamlResponseParams {
  privateKey: string;
  userEmail: string;
  recipientUrl: string;
  recipientName: string;
  issuer: string;
  inResponseTo?: string;
  validDaysBefore?: number;
  validDaysAfter?: number;
}

function signResponse(doc: string, privateKey: string): string {
  const signatureAlg = 'http://www.w3.org/2000/09/xmldsig#rsa-sha1';
  const digestAlg = 'http://www.w3.org/2001/04/xmlenc#sha256';
  const canonicalizationAlg = 'http://www.w3.org/TR/2001/REC-xml-c14n-20010315#WithComments';
  const transfromAlgs = [
    'http://www.w3.org/2000/09/xmldsig#enveloped-signature',
    'http://www.w3.org/2001/10/xml-exc-c14n#',
  ];
  const sig = new SignedXml();
  sig.addReference("//*[local-name(.)='Response']", transfromAlgs, digestAlg);
  sig.signingKey = privateKey;
  sig.signatureAlgorithm = signatureAlg;
  sig.canonicalizationAlgorithm = canonicalizationAlg;
  const opts: ComputeSignatureOptions = {
    location: {
      reference: "//*[local-name(.)='Issuer']",
      action: 'after',
    },
    prefix: 'ds',
  };

  sig.computeSignature(removeWhitespace(doc), opts);

  return sig.getSignedXml();
}

export default function buildResponse({
  privateKey,
  userEmail,
  recipientUrl,
  recipientName,
  issuer,
  inResponseTo = uuid(),
  validDaysBefore = 0,
  validDaysAfter = 1,
}: SamlResponseParams): string {
  const now = new Date();
  const responseId = randomBytes(16).toString('hex');

  const assertion = buildAssertion({
    issuer,
    recipientUrl,
    recipientName,
    inResponseTo,
    validDaysBefore,
    validDaysAfter,
    userEmail,
  });

  const doc = `<?xml version="1.0" encoding="UTF-8"?>
<saml2p:Response xmlns:saml2p="urn:oasis:names:tc:SAML:2.0:protocol" Destination="${recipientName}" ID="_${responseId}" InResponseTo="${inResponseTo}" IssueInstant="${now.toISOString()}" Version="2.0">
  <saml2:Issuer xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion">${issuer}</saml2:Issuer>
  <saml2p:Status>
    <saml2p:StatusCode Value="urn:oasis:names:tc:SAML:2.0:status:Success"></saml2p:StatusCode>
  </saml2p:Status>
  ${assertion}
</saml2p:Response>`;

  return signResponse(doc, privateKey);
}
