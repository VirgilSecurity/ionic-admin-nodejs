import BasicAuthentication from '../../../src/client/auth/basic-authentication';

test('appends Authorization header to the request', () => {
  const usename = 'test';
  const password = 'test123';
  const expectedValue = 'Basic dGVzdDp0ZXN0MTIz';
  const auth = new BasicAuthentication(usename, password);
  const request = {
    headers: {} as any,
  };

  auth.authenticate(request);

  expect(request.headers.Authorization).toBe(expectedValue);
});
