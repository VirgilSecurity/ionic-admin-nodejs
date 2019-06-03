import { UserApiClient } from '../../../src/client/apis/scim/users';
import { IonicUrlParams } from '../../../src/client/url-params-builder';

test('can create user', async () => {
  const expectedUser = {
    id: 'test',
  };
  const reqExecutorMock: any = {
    post: jest.fn().mockResolvedValue({ data: expectedUser }),
  };
  const users = new UserApiClient(reqExecutorMock, '/TestUsers');

  expect.assertions(4);

  const userData = { name: { givenName: 'Test', familyName: 'User' } };
  const actualUser = await users.create(userData);
  const [actualUrl, actualData, actualConfig] = reqExecutorMock.post.mock.calls[0];

  expect(actualUser).toBe(expectedUser);
  expect(actualUrl).toBe('/TestUsers');
  expect(actualData).toBe(userData);
  expect(actualConfig.params).toBeUndefined();
});

test('can specify attributes to return after creating user', async () => {
  const reqExecutorMock: any = {
    post: jest.fn().mockResolvedValue({ data: {} }),
  };
  const users = new UserApiClient(reqExecutorMock, '/TestUsers');

  expect.assertions(2);
  const userData = { name: { givenName: 'Test', familyName: 'User' } };
  await users.create(userData, ['name', 'emails']);
  const [, , actualConfig] = reqExecutorMock.post.mock.calls[0];
  expect(actualConfig.params).toBeInstanceOf(IonicUrlParams);
  expect(actualConfig.params.params.attributes).toBe('name,emails');
});

test('can list users', async () => {
  const expectedResult = {};
  const reqExecutorMock: any = {
    get: jest.fn().mockResolvedValue({ data: expectedResult }),
  };
  const users = new UserApiClient(reqExecutorMock, '/TestUsers');

  expect.assertions(3);
  const result = await users.list();
  const [actualUrl, actualConfig] = reqExecutorMock.get.mock.calls[0];
  expect(result).toBe(expectedResult);
  expect(actualUrl).toBe('/TestUsers');
  expect(actualConfig.params).toBeUndefined();
});

test('can provide search params', async () => {
  const reqExecutorMock: any = {
    get: jest.fn().mockResolvedValue({ data: {} }),
  };
  const users = new UserApiClient(reqExecutorMock, '/TestUsers');
  expect.assertions(4);
  await users.list({ skip: 1, limit: 10, filter: { email: 'user@example.com' } });
  const [, actualConfig] = reqExecutorMock.get.mock.calls[0];
  expect(actualConfig.params).toBeInstanceOf(IonicUrlParams);
  expect(actualConfig.params.params.skip).toBe(1);
  expect(actualConfig.params.params.limit).toBe(10);
  expect(actualConfig.params.params.email).toBe('user@example.com');
});

test('can fetch user', async () => {
  const userId = 'test_id';
  const expectedUser = {};
  const reqExecutorMock: any = {
    get: jest.fn().mockResolvedValue({ data: expectedUser }),
  };
  const users = new UserApiClient(reqExecutorMock, '/TestUsers');

  expect.assertions(3);
  const actualUser = await users.fetch(userId);
  const [actualUrl, actualConfig] = reqExecutorMock.get.mock.calls[0];
  expect(actualUser).toBe(expectedUser);
  expect(actualUrl).toBe('/TestUsers/test_id');
  expect(actualConfig.params).toBeUndefined();
});

test('can specify attributes to return when fetching', async () => {
  const reqExecutorMock: any = {
    get: jest.fn().mockResolvedValue({ data: {} }),
  };
  const users = new UserApiClient(reqExecutorMock, '/TestUsers');

  expect.assertions(2);
  await users.fetch('test_id', ['name', 'emails']);
  const [, actualConfig] = reqExecutorMock.get.mock.calls[0];
  expect(actualConfig.params).toBeInstanceOf(IonicUrlParams);
  expect(actualConfig.params.params.attributes).toBe('name,emails');
});

test('can update user', async () => {
  const userId = 'test_id';
  const expectedResult = {};
  const reqExecutorMock: any = {
    put: jest.fn().mockResolvedValue({ data: expectedResult }),
  };
  const users = new UserApiClient(reqExecutorMock, '/TestUsers');

  expect.assertions(4);
  const updateData = { name: { familyName: 'Tester' } };
  const actualResult = await users.update(userId, updateData);
  const [actualUrl, actualData, actualConfig] = reqExecutorMock.put.mock.calls[0];
  expect(actualResult).toBe(expectedResult);
  expect(actualUrl).toBe('/TestUsers/test_id');
  expect(actualData).toBe(updateData);
  expect(actualConfig.params).toBeUndefined();
});

test('can specify attributes to return after update', async () => {
  const reqExecutorMock: any = {
    put: jest.fn().mockResolvedValue({ data: {} }),
  };
  const users = new UserApiClient(reqExecutorMock, '/TestUsers');

  expect.assertions(2);
  const updateData = { name: { familyName: 'Tester' } };
  await users.update('test_id', updateData, ['name', 'groups']);
  const [, , actualConfig] = reqExecutorMock.put.mock.calls[0];
  expect(actualConfig.params).toBeInstanceOf(IonicUrlParams);
  expect(actualConfig.params.params.attributes).toBe('name,groups');
});

test('can delete user', async () => {
  const reqExecutorMock: any = {
    delete: jest.fn().mockResolvedValue({}),
  };
  const users = new UserApiClient(reqExecutorMock, '/TestUsers');
  const userId = 'id_to_delete';

  expect.assertions(2);
  const result = await users.delete(userId);
  const [actualUrl] = reqExecutorMock.delete.mock.calls[0];
  expect(result).toBeUndefined();
  expect(actualUrl).toBe('/TestUsers/id_to_delete');
});
