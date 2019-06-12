import { UserApiClient } from '../../../src/client/apis/scim/users';

test('can create user', async () => {
  const expectedUser = {
    id: 'test',
  };
  const resourceApiClientMock: any = {
    createResource: jest.fn().mockResolvedValue(expectedUser),
  };
  const users = new UserApiClient(resourceApiClientMock);

  const userData = { schemas: ['urn:scim:schemas:core:1.0'], name: { givenName: 'Test', familyName: 'User' } };
  const attrs = ['name', 'emails'];
  const actualUser = await users.createUser(userData, attrs);

  expect(actualUser).toBe(expectedUser);
  expect(resourceApiClientMock.createResource).toHaveBeenCalledWith(userData, attrs);
});

test('can get user list', async () => {
  const expectedResult = {};
  const resourceApiClientMock: any = {
    getResourceList: jest.fn().mockResolvedValue(expectedResult),
  };
  const users = new UserApiClient(resourceApiClientMock);

  const params = { skip: 1, limit: 10, filter: { email: 'user@example.com' } };
  const result = await users.listUsers(params);
  expect(result).toBe(expectedResult);
  expect(resourceApiClientMock.getResourceList).toHaveBeenCalledWith(params);
});

test('can get user by id', async () => {
  const expectedUser = {};
  const resourceApiClientMock: any = {
    getResource: jest.fn().mockResolvedValue(expectedUser),
  };
  const users = new UserApiClient(resourceApiClientMock);

  const userId = 'test_id';
  const attrs = ['name', 'emails'];
  const actualUser = await users.fetchUser(userId, attrs);
  expect(actualUser).toBe(expectedUser);
  expect(resourceApiClientMock.getResource).toHaveBeenCalledWith(userId, attrs);
});

test('can update user', async () => {
  const expectedResult = {};
  const resourceApiClientMock: any = {
    updateResource: jest.fn().mockResolvedValue(expectedResult),
  };
  const users = new UserApiClient(resourceApiClientMock);

  const userId = 'test_id';
  const updateData = { schemas: ['urn:scim:schemas:core:1.0'], name: { familyName: 'Tester' } };
  const attrs = ['name', 'groups'];
  const actualResult = await users.updateUser(userId, updateData, attrs);

  expect(actualResult).toBe(expectedResult);
  expect(resourceApiClientMock.updateResource).toHaveBeenCalledWith(userId, updateData, attrs);
});

test('can delete user', async () => {
  const resourceApiClientMock: any = {
    deleteResource: jest.fn().mockResolvedValue(undefined),
  };
  const users = new UserApiClient(resourceApiClientMock);

  const userId = 'id_to_delete';
  const result = await users.deleteUser(userId);
  expect(result).toBeUndefined();
  expect(resourceApiClientMock.deleteResource).toHaveBeenCalledWith(userId);
});
