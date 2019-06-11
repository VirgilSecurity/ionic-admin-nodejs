import { RoleApiClient } from '../../../src/client/apis/scim/roles';

test('can create role', async () => {
  const expectedRole = {};
  const resourceApiClientMock: any = {
    createResource: jest.fn().mockResolvedValue(expectedRole),
  };
  const client = new RoleApiClient(resourceApiClientMock);

  const roleData = { schemas: ['urn:scim:schemas:core:1.0'], name: 'MyRole' };
  const role = await client.createRole(roleData);

  expect(role).toBe(expectedRole);
  expect(resourceApiClientMock.createResource).toHaveBeenCalledWith(roleData);
});

test('can get role list', async () => {
  const expectedResult = {};
  const resourceApiClientMock: any = {
    getResourceList: jest.fn().mockResolvedValue(expectedResult),
  };
  const client = new RoleApiClient(resourceApiClientMock);

  const params = { skip: 1 };
  const roleList = await client.listRoles(params);

  expect(roleList).toBe(expectedResult);
  expect(resourceApiClientMock.getResourceList).toHaveBeenCalledWith(params);
});

test('can get role by id', async () => {
  const expectedResult = {};
  const resourceApiClientMock: any = {
    getResource: jest.fn().mockResolvedValue(expectedResult),
  };
  const client = new RoleApiClient(resourceApiClientMock);

  const roleId = 'test_id';
  const role = await client.fetchRole(roleId);

  expect(role).toBe(expectedResult);
  expect(resourceApiClientMock.getResource).toHaveBeenCalledWith(roleId);
});

test('can update role', async () => {
  const expectedResult = {};
  const resourceApiClientMock: any = {
    updateResource: jest.fn().mockResolvedValue(expectedResult),
  };
  const client = new RoleApiClient(resourceApiClientMock);

  const roleId = 'test_id';
  const roleData = { schemas: ['urn:scim:schemas:core:1.0'], name: 'NewName' };
  const updatedRole = await client.updateRole(roleId, roleData);

  expect(updatedRole).toBe(expectedResult);
  expect(resourceApiClientMock.updateResource).toHaveBeenCalledWith(roleId, roleData);
});

test('can delete role', async () => {
  const resourceApiClientMock: any = {
    deleteResource: jest.fn().mockResolvedValue(undefined),
  };
  const client = new RoleApiClient(resourceApiClientMock);

  const roleId = 'test_id';
  const result = await client.deleteRole(roleId);

  expect(result).toBeUndefined();
  expect(resourceApiClientMock.deleteResource).toHaveBeenCalledWith(roleId);
});
