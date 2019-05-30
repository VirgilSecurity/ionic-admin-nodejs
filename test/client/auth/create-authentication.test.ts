import createAuthentication from '../../../src/client/auth/create-authentication';
import BasicAuthentication from '../../../src/client/auth/basic-authentication';
import BearerAuthentication from '../../../src/client/auth/bearer-authentication';
import MacAuthentication from '../../../src/client/auth/mac-authentication';

test('creates BasicAuthentication when type is "basic"', () => {
  const auth = createAuthentication({
    type: 'basic',
    username: 'test',
    password: 'test',
  });

  expect(auth).toBeInstanceOf(BasicAuthentication);
});

test('creates BearerAuthentication when type is "bearer"', () => {
  const auth = createAuthentication({
    type: 'bearer',
    secretToken: 'test',
  });

  expect(auth).toBeInstanceOf(BearerAuthentication);
});

test('creates MacAuthentication when type is "mac"', () => {
  const auth = createAuthentication({
    type: 'mac',
    apiKeyId: 'test',
    apiKeySecret: 'test',
  });

  expect(auth).toBeInstanceOf(MacAuthentication);
});

test('throws when given invalid options', () => {
  expect(() => createAuthentication({} as any)).toThrow();
});
