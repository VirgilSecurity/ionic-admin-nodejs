import { createHmac } from 'crypto';
import MacAuthentication from '../../../src/client/auth/mac-authentication';

test('appends Authorization header to the request', () => {
  const apiKeyId = 'test_id';
  const apiKeySecret = Buffer.from('test_secret');
  const auth = new MacAuthentication(apiKeyId, apiKeySecret.toString('base64'));

  const now = new Date().toUTCString();
  const request = {
    method: 'GET',
    url: 'https://example.com/test',
    headers: {
      Date: now,
    } as any,
  };

  const expectedStringToSign = [
    'GET\n',
    '\n', // Content-MD5
    '\n', // Content-Type
    `${now}\n`,
    '/test',
  ].join('');

  const expectedSignature = calculateHmac(expectedStringToSign, apiKeySecret);

  auth.authenticate(request);
  expect(request.headers.Authorization).toBe(`IONIC test_id:${expectedSignature}`);
});

test('appends Date header if not set', () => {
  const apiKeyId = 'test_id';
  const apiKeySecret = Buffer.from('test_secret');
  const auth = new MacAuthentication(apiKeyId, apiKeySecret.toString('base64'));

  const request = {
    method: 'GET',
    url: 'https://example.com/test',
    headers: {} as any,
  };

  auth.authenticate(request);
  expect(request.headers.Date).toBe(new Date().toUTCString());
});

test('excludes /v2 prefix from pathname', () => {
  const apiKeyId = 'test_id';
  const apiKeySecret = Buffer.from('test_secret');
  const auth = new MacAuthentication(apiKeyId, apiKeySecret.toString('base64'));

  const now = new Date().toUTCString();
  const request = {
    method: 'GET',
    url: 'https://example.com/v2/test', // /v2 prefix included
    headers: {
      Date: now,
    } as any,
  };

  const expectedStringToSign = [
    'GET\n',
    '\n', // Content-MD5
    '\n', // Content-Type
    `${now}\n`,
    '/test', // /v2 prefix excluded
  ].join('');

  const expectedSignature = calculateHmac(expectedStringToSign, apiKeySecret);

  auth.authenticate(request);
  expect(request.headers.Authorization).toBe(`IONIC test_id:${expectedSignature}`);
});

test('includes Content-Type and Content-MD5 headers', () => {
  const apiKeyId = 'test_id';
  const apiKeySecret = Buffer.from('test_secret');
  const auth = new MacAuthentication(apiKeyId, apiKeySecret.toString('base64'));

  const now = new Date().toUTCString();
  const request = {
    method: 'GET',
    url: 'https://example.com/test',
    headers: {
      Date: now,
      'Content-Type': 'application/json',
      'Content-MD5': 'dGVzdA==', // base64('test')
    } as any,
  };

  const expectedStringToSign = [
    'GET\n',
    'dGVzdA==\n', // Content-Type
    'application/json\n', // Content-MD5
    `${now}\n`,
    '/test',
  ].join('');

  const expectedSignature = calculateHmac(expectedStringToSign, apiKeySecret);

  auth.authenticate(request);
  expect(request.headers.Authorization).toBe(`IONIC test_id:${expectedSignature}`);
});

function calculateHmac(stringToSign: string, secret: Buffer) {
  const hmac = createHmac('sha1', secret);
  hmac.update(stringToSign);
  return hmac.digest('base64');
}
