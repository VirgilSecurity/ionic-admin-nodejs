/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { DOMParser } from 'xmldom';
import buildAssertion, { SamlAssertionParams } from '../../src/saml/build-assertion';

test('sets correct attributes', () => {
  const params: SamlAssertionParams = {
    issuer: 'test-issuer',
    inResponseTo: 'test-request-id',
    validDaysBefore: 2,
    validDaysAfter: 2,
    recipientUrl: 'test-recipient-url',
    userEmail: 'test@test.test',
    recipientName: 'test-recipient-name',
  };
  const now = new Date();

  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(now.getDate() - 2);

  const twoDaysFromNow = new Date();
  twoDaysFromNow.setDate(now.getDate() + 2);

  const assertion = buildAssertion(params);
  const parser = new DOMParser();
  const doc = parser.parseFromString(assertion, 'application/xml');

  expect(doc.documentElement.getAttribute('ID')).not.toBeNull();

  expect(doc.documentElement.getAttribute('IssueInstant')).not.toBeNull();
  const assertionIssueInstant = new Date(doc.documentElement.getAttribute('IssueInstant') as string);
  expect(isLessThanOneSecondApart(assertionIssueInstant, now)).toBe(true);

  const issuer = doc.documentElement.getElementsByTagName('saml2:Issuer')[0];
  expect(issuer).toBeDefined();
  expect(issuer.textContent).toEqual(params.issuer);

  const confirmationData = doc.documentElement.getElementsByTagName('saml2:SubjectConfirmationData')[0];
  expect(confirmationData).toBeDefined();
  expect(confirmationData.getAttribute('InResponseTo')).toEqual(params.inResponseTo);

  expect(confirmationData.getAttribute('NotBefore')).not.toBeNull();
  const confirmationDataNotBefore = new Date(confirmationData.getAttribute('NotBefore') as string);
  expect(isLessThanOneSecondApart(confirmationDataNotBefore, twoDaysAgo)).toBe(true);

  expect(confirmationData.getAttribute('NotOnOrAfter')).not.toBeNull();
  const confirmationDataNotOnOrAfter = new Date(confirmationData.getAttribute('NotOnOrAfter') as string);
  expect(isLessThanOneSecondApart(confirmationDataNotOnOrAfter, twoDaysFromNow)).toBe(true);

  const conditions = doc.documentElement.getElementsByTagName('saml2:Conditions')[0];
  expect(conditions).toBeDefined();

  expect(conditions.getAttribute('NotBefore')).not.toBeNull();
  const conditionsNotBefore = new Date(conditions.getAttribute('NotBefore') as string);
  expect(isLessThanOneSecondApart(conditionsNotBefore, twoDaysAgo)).toBe(true);

  expect(conditions.getAttribute('NotOnOrAfter')).not.toBeNull();
  const conditionsNotOnOrAfter = new Date(conditions.getAttribute('NotOnOrAfter') as string);
  expect(isLessThanOneSecondApart(conditionsNotOnOrAfter, twoDaysFromNow)).toBe(true);

  const audience = conditions.getElementsByTagName('saml2:Audience')[0];
  expect(audience).toBeDefined();
  expect(audience.textContent).toEqual(params.recipientName);

  const emailAttr = doc.documentElement.getElementsByTagName('saml2:AttributeValue')[0];
  expect(emailAttr).toBeDefined();
  expect(emailAttr.textContent).toEqual(params.userEmail);

  const authnStatement = doc.documentElement.getElementsByTagName('saml2:AuthnStatement')[0];
  expect(authnStatement).toBeDefined();

  expect(authnStatement.getAttribute('AuthnInstant')).not.toBeNull();
  const authnInstant = new Date(authnStatement.getAttribute('AuthnInstant') as string);
  expect(isLessThanOneSecondApart(authnInstant, now)).toBe(true);
});

function isLessThanOneSecondApart(a: Date, b: Date): boolean {
  const distance = Math.abs(a.getTime() - b.getTime());
  return distance < 1000;
}
