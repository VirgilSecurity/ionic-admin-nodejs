import { ScimApiClient } from '../../../src/client/apis/scim/scim-api-client';
import ResourceApiClient from '../../../src/client/apis/scim/resource-api-client';
import { GroupPatchData } from '../../../src/client/apis/scim/groups';

const createResourceMock = jest.fn();
const getResourceMock = jest.fn();
const getResourceListMock = jest.fn();
const updateResourceMock = jest.fn();
const patchResourceMock = jest.fn();
const deleteResourceMock = jest.fn();

const requestExecutorStub: any = {};

jest.mock('../../../src/client/apis/scim/resource-api-client', () => {
  return jest.fn().mockImplementation(() => ({
    createResource: createResourceMock,
    getResource: getResourceMock,
    getResourceList: getResourceListMock,
    updateResource: updateResourceMock,
    patchResource: patchResourceMock,
    deleteResource: deleteResourceMock,
  }));
});

afterEach(() => {
  [
    createResourceMock,
    getResourceMock,
    getResourceListMock,
    updateResourceMock,
    patchResourceMock,
    deleteResourceMock,
  ].forEach(mock => mock.mockReset());
});

describe('Initialization', () => {
  test('supplies correct arguments to ResourceApiClient constructors', () => {
    new ScimApiClient(requestExecutorStub);

    const ResourceApiClientMock = ResourceApiClient as jest.Mock;
    expect(ResourceApiClientMock).toHaveBeenCalledTimes(4);
    expect(ResourceApiClientMock).toHaveBeenCalledWith(requestExecutorStub, '/scim/Users');
    expect(ResourceApiClientMock).toHaveBeenCalledWith(requestExecutorStub, '/scim/Groups');
    expect(ResourceApiClientMock).toHaveBeenCalledWith(requestExecutorStub, '/scim/Devices');
    expect(ResourceApiClientMock).toHaveBeenCalledWith(requestExecutorStub, '/scim/Roles');
  });

  test('provides Schemas', () => {
    const scim = new ScimApiClient(requestExecutorStub);

    expect(scim.Schemas.Core).toBe('urn:scim:schemas:core:1.0');
    expect(scim.Schemas.Ionic).toBe('urn:scim:schemas:extension:ionic:1.0');
    expect(scim.Schemas.Enterprise).toBe('urn:scim:schemas:extension:enterprise:1.0');
  });
});

describe('Scope management', () => {
  test('can get scope list', async () => {
    const expectedResult = {};
    const reqExecutorMock = {
      get: jest.fn().mockResolvedValue({ data: expectedResult }),
    };
    const scim = new ScimApiClient(reqExecutorMock as any);

    expect.assertions(2);
    const actualResult = await scim.listScopes();
    expect(actualResult).toBe(expectedResult);
    expect(reqExecutorMock.get).toHaveBeenCalledWith('/scim/Scopes');
  });
});

describe('User management', () => {
  test('can create user', async () => {
    const expectedUser = {
      id: 'test',
    };
    createResourceMock.mockResolvedValue(expectedUser);
    const scim = new ScimApiClient(requestExecutorStub);

    const userData = { schemas: ['urn:scim:schemas:core:1.0'], name: { givenName: 'Test', familyName: 'User' } };
    const attrs = ['name', 'emails'];
    const actualUser = await scim.createUser(userData, attrs);

    expect(actualUser).toBe(expectedUser);
    expect(createResourceMock).toHaveBeenCalledWith(userData, attrs);
  });

  test('can get user list', async () => {
    const expectedResult = {};
    getResourceListMock.mockResolvedValue(expectedResult);
    const scim = new ScimApiClient(requestExecutorStub);

    const params = { skip: 1, limit: 10, filter: { email: 'user@example.com' } };
    const result = await scim.listUsers(params);

    expect(result).toBe(expectedResult);
    expect(getResourceListMock).toHaveBeenCalledWith(params);
  });

  test('can get user by id', async () => {
    const expectedUser = {};
    getResourceMock.mockResolvedValue(expectedUser);
    const scim = new ScimApiClient(requestExecutorStub);

    const userId = 'test_id';
    const attrs = ['name', 'emails'];
    const actualUser = await scim.fetchUser(userId, attrs);
    expect(actualUser).toBe(expectedUser);
    expect(getResourceMock).toHaveBeenCalledWith(userId, attrs);
  });

  test('can update user', async () => {
    const expectedResult = {};
    updateResourceMock.mockResolvedValue(expectedResult);
    const scim = new ScimApiClient(requestExecutorStub);

    const userId = 'test_id';
    const updateData = { schemas: ['urn:scim:schemas:core:1.0'], name: { familyName: 'Tester' } };
    const attrs = ['name', 'groups'];
    const actualResult = await scim.updateUser(userId, updateData, attrs);

    expect(actualResult).toBe(expectedResult);
    expect(updateResourceMock).toHaveBeenCalledWith(userId, updateData, attrs);
  });
});

describe('Group management', () => {
  test('can create group', async () => {
    const expectedGroup = {
      id: 'test',
    };
    createResourceMock.mockResolvedValue(expectedGroup);
    const scim = new ScimApiClient(requestExecutorStub);

    const groupData = { schemas: ['urn:scim:schemas:core:1.0'], displayName: 'Test Group' };
    const attrs = ['displayName', 'members'];
    const actualGroup = await scim.createGroup(groupData, attrs);

    expect(actualGroup).toBe(expectedGroup);
    expect(createResourceMock).toHaveBeenCalledWith(groupData, attrs);
  });

  test('can list groups', async () => {
    const expectedResult = {};
    getResourceListMock.mockResolvedValue(expectedResult);
    const scim = new ScimApiClient(requestExecutorStub);

    const params = { skip: 1, limit: 10, filter: { name: 'MyGroup' } };
    const result = await scim.listGroups(params);

    expect(result).toBe(expectedResult);
    expect(getResourceListMock).toHaveBeenCalledWith(params);
  });

  test('can fetch group', async () => {
    const expectedGroup = {};
    getResourceMock.mockResolvedValue(expectedGroup);
    const scim = new ScimApiClient(requestExecutorStub);

    const groupId = 'test_id';
    const attrs = ['displayName', 'members'];
    const actualGroup = await scim.fetchGroup(groupId, attrs);

    expect(actualGroup).toBe(expectedGroup);
    expect(getResourceMock).toHaveBeenCalledWith(groupId, attrs);
  });

  test('can update group', async () => {
    const expectedResult = {};
    updateResourceMock.mockResolvedValue(expectedResult);
    const scim = new ScimApiClient(requestExecutorStub);

    const groupId = 'test_id';
    const groupData = { schemas: ['urn:scim:schemas:core:1.0'], displayName: 'Updated Group' };
    const attrs = ['displayName', 'members'];
    const actualResult = await scim.updateGroup(groupId, groupData, attrs);

    expect(actualResult).toBe(expectedResult);
    expect(updateResourceMock).toHaveBeenCalledWith(groupId, groupData, attrs);
  });

  test('can patch group', async () => {
    patchResourceMock.mockResolvedValue(undefined);
    const scim = new ScimApiClient(requestExecutorStub);

    const groupId = 'test_id';
    const patchData: GroupPatchData = {
      schemas: ['urn:scim:schemas:core:1.0', 'urn:scim:schemas:extension:ionic:1.0'],
      members: [
        {
          value: '777777777777777777',
          operation: 'delete',
        },
        {
          value: '888888888888888888',
        },
      ],
      displayName: 'NewDisplayName',
    };

    const patchResult = await scim.patchGroup(groupId, patchData);

    expect(patchResult).toBeUndefined();
    expect(patchResourceMock).toHaveBeenCalledWith(groupId, patchData, undefined);
  });

  test('can specify attributes to return after patching', async () => {
    const expectedResult = {
      schemas: ['urn:scim:schemas:core:1.0', 'urn:scim:schemas:extension:ionic:1.0'],
      members: [
        {
          display: 'Jane Doe',
          value: '4444444444444444444444',
        },
      ],
    };
    patchResourceMock.mockResolvedValue(expectedResult);
    const scim = new ScimApiClient(requestExecutorStub);

    const groupId = 'test_id';
    const patchData: GroupPatchData = {
      schemas: ['urn:scim:schemas:core:1.0', 'urn:scim:schemas:extension:ionic:1.0'],
      meta: {
        attributes: ['members'],
      },
      members: [{ display: 'Jane Doe', value: '4444444444444444444444' }],
    };
    const attrs = ['displayName', 'members'];

    const actualResult = await scim.patchGroup(groupId, patchData, attrs);

    expect(actualResult).toBe(expectedResult);
    expect(patchResourceMock).toHaveBeenCalledWith(groupId, patchData, attrs);
  });

  test('can delete group', async () => {
    deleteResourceMock.mockResolvedValue(undefined);
    const scim = new ScimApiClient(requestExecutorStub);

    const groupId = 'id_to_delete';
    const result = await scim.deleteGroup(groupId);

    expect(result).toBeUndefined();
    expect(deleteResourceMock).toHaveBeenCalledWith(groupId);
  });
});

describe('Device management', () => {
  test('can get device list', async () => {
    const expectedResult = {};
    getResourceListMock.mockResolvedValue(expectedResult);
    const scim = new ScimApiClient(requestExecutorStub);

    const params = { skip: 10, filter: { userId: '123456' } };
    const result = await scim.listDevices(params);

    expect(result).toBe(expectedResult);
    expect(getResourceListMock).toHaveBeenCalledWith(params);
  });

  test('can fetch device', async () => {
    const expectedDevice = {};
    getResourceMock.mockResolvedValue(expectedDevice);
    const scim = new ScimApiClient(requestExecutorStub);

    const deviceId = 'test_id';
    const attrs = ['keySpace', 'displayName', 'user'];
    const actualDevice = await scim.fetchDevice(deviceId, attrs);

    expect(actualDevice).toBe(expectedDevice);
    expect(getResourceMock).toHaveBeenCalledWith(deviceId, attrs);
  });

  test('can update device', async () => {
    const expectedResult = {};
    updateResourceMock.mockResolvedValue(expectedResult);
    const scim = new ScimApiClient(requestExecutorStub);

    const deviceId = 'test_id';
    const deviceData = { schemas: ['urn:scim:schemas:core:1.0'], name: 'NewDeviceName', status: false };
    const attrs = ['keySpace', 'user'];

    const actualResult = await scim.updateDevice(deviceId, deviceData, attrs);
    expect(actualResult).toBe(expectedResult);
    expect(updateResourceMock).toBeCalledWith(deviceId, deviceData, attrs);
  });

  test('can delete device', async () => {
    deleteResourceMock.mockResolvedValue(undefined);
    const scim = new ScimApiClient(requestExecutorStub);

    const deviceId = 'id_to_delete';
    const result = await scim.deleteDevice(deviceId);
    expect(result).toBeUndefined();
    expect(deleteResourceMock).toHaveBeenCalledWith(deviceId);
  });
});

describe('Role management', () => {
  test('can create role', async () => {
    const expectedRole = {};
    createResourceMock.mockResolvedValue(expectedRole);
    const scim = new ScimApiClient(requestExecutorStub);

    const roleData = { schemas: ['urn:scim:schemas:core:1.0'], name: 'MyRole' };
    const role = await scim.createRole(roleData);

    expect(role).toBe(expectedRole);
    expect(createResourceMock).toHaveBeenCalledWith(roleData);
  });

  test('can get role list', async () => {
    const expectedResult = {};
    getResourceListMock.mockResolvedValue(expectedResult);
    const scim = new ScimApiClient(requestExecutorStub);

    const params = { skip: 1 };
    const roleList = await scim.listRoles(params);

    expect(roleList).toBe(expectedResult);
    expect(getResourceListMock).toHaveBeenCalledWith(params);
  });

  test('can get role by id', async () => {
    const expectedResult = {};
    getResourceMock.mockResolvedValue(expectedResult);
    const scim = new ScimApiClient(requestExecutorStub);

    const roleId = 'test_id';
    const role = await scim.fetchRole(roleId);

    expect(role).toBe(expectedResult);
    expect(getResourceMock).toHaveBeenCalledWith(roleId);
  });

  test('can update role', async () => {
    const expectedResult = {};
    updateResourceMock.mockResolvedValue(expectedResult);
    const scim = new ScimApiClient(requestExecutorStub);

    const roleId = 'test_id';
    const roleData = { schemas: ['urn:scim:schemas:core:1.0'], name: 'NewName' };
    const updatedRole = await scim.updateRole(roleId, roleData);

    expect(updatedRole).toBe(expectedResult);
    expect(updateResourceMock).toHaveBeenCalledWith(roleId, roleData);
  });

  test('can delete role', async () => {
    deleteResourceMock.mockResolvedValue(undefined);
    const scim = new ScimApiClient(requestExecutorStub);

    const roleId = 'test_id';
    const result = await scim.deleteRole(roleId);

    expect(result).toBeUndefined();
    expect(deleteResourceMock).toHaveBeenCalledWith(roleId);
  });
});
