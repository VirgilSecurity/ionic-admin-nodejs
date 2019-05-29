import BearerAuthentication from '../../../src/client/auth/bearer-authentication';

test('appends Authorization header to the request', () => {
  const secretToken = 'test';
  const expectedValue = 'Bearer test';
  const auth = new BearerAuthentication(secretToken);
  const request = {
    headers: {} as any,
  };

  auth.authenticate(request);

  expect(request.headers.Authorization).toBe(expectedValue);
});
