import { randomBytes } from 'crypto';
import { addDays, subtractDays } from '../utils';

export interface SamlAssertionParams {
  issuer: string;
  inResponseTo: string;
  validDaysBefore: number;
  validDaysAfter: number;
  recipientUrl: string;
  userEmail: string;
  recipientName: string;
}

export default function buildAssertion({
  issuer,
  inResponseTo,
  validDaysBefore,
  validDaysAfter,
  recipientUrl,
  userEmail,
  recipientName,
}: SamlAssertionParams): string {
  const now = new Date();
  const assertionId = randomBytes(16).toString('hex');
  const notBefore = subtractDays(now, validDaysBefore).toISOString();
  const notOnOrAfter = addDays(now, validDaysAfter).toISOString();

  return `<saml2:Assertion xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" ID="_${assertionId}" IssueInstant="${now.toISOString()}" Version="2.0">
  <saml2:Issuer>${issuer}</saml2:Issuer>
  <saml2:Subject>
    <saml2:NameID Format="urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress">email</saml2:NameID>
    <saml2:SubjectConfirmation Method="urn:oasis:names:tc:SAML:2.0:cm:bearer">
      <saml2:SubjectConfirmationData InResponseTo="${inResponseTo}" NotBefore="${notBefore}" NotOnOrAfter="${notOnOrAfter}" Recipient="${recipientUrl}"></saml2:SubjectConfirmationData>
    </saml2:SubjectConfirmation>
  </saml2:Subject>
  <saml2:Conditions NotBefore="${notBefore}" NotOnOrAfter="${notOnOrAfter}">
    <saml2:AudienceRestriction>
      <saml2:Audience>${recipientName}</saml2:Audience>
    </saml2:AudienceRestriction>
  </saml2:Conditions>
  <saml2:AttributeStatement>
    <saml2:Attribute Name="email">
      <saml2:AttributeValue xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xsd:string">${userEmail}</saml2:AttributeValue>
    </saml2:Attribute>
  </saml2:AttributeStatement>
  <saml2:AuthnStatement AuthnInstant="${now.toISOString()}">
    <saml2:AuthnContext>
      <saml2:AuthnContextClassRef>urn:oasis:names:tc:SAML:2.0:ac:classes:Password</saml2:AuthnContextClassRef>
    </saml2:AuthnContext>
  </saml2:AuthnStatement>
</saml2:Assertion>`;
}
