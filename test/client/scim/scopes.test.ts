import { ScopeApiClient } from '../../../src/client/apis/scim/scopes';

test('can get scope list', async () => {
  const expectedResult = {};
  const reqExecutorMock: any = {
    get: jest.fn().mockResolvedValue({ data: expectedResult }),
  };
  const scopes = new ScopeApiClient(reqExecutorMock, '/Scopes');

  expect.assertions(2);
  const actualResult = await scopes.listScopes();
  const [actualUrl] = reqExecutorMock.get.mock.calls[0];
  expect(actualResult).toBe(expectedResult);
  expect(actualUrl).toBe('/Scopes');
});
