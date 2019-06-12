import { GroupApiClient, GroupPatchData } from '../../../src/client/apis/scim/groups';

test('can create group', async () => {
  const expectedGroup = {
    id: 'test',
  };
  const resourceApiClientMock: any = {
    createResource: jest.fn().mockResolvedValue(expectedGroup),
  };
  const groups = new GroupApiClient(resourceApiClientMock);

  const groupData = { schemas: ['urn:scim:schemas:core:1.0'], displayName: 'Test Group' };
  const attrs = ['displayName', 'members'];
  const actualGroup = await groups.createGroup(groupData, attrs);

  expect(actualGroup).toBe(expectedGroup);
  expect(resourceApiClientMock.createResource).toHaveBeenCalledWith(groupData, attrs);
});

test('can list groups', async () => {
  const expectedResult = {};
  const resourceApiClientMock: any = {
    getResourceList: jest.fn().mockResolvedValue(expectedResult),
  };
  const groups = new GroupApiClient(resourceApiClientMock);

  const params = { skip: 1, limit: 10, filter: { name: 'MyGroup' } };
  const result = await groups.listGroups(params);

  expect(result).toBe(expectedResult);
  expect(resourceApiClientMock.getResourceList).toHaveBeenCalledWith(params);
});

test('can fetch group', async () => {
  const expectedGroup = {};
  const resourceApiClientMock: any = {
    getResource: jest.fn().mockResolvedValue(expectedGroup),
  };
  const groups = new GroupApiClient(resourceApiClientMock);

  const groupId = 'test_id';
  const attrs = ['displayName', 'members'];
  const actualGroup = await groups.fetchGroup(groupId, attrs);

  expect(actualGroup).toBe(expectedGroup);
  expect(resourceApiClientMock.getResource).toHaveBeenCalledWith(groupId, attrs);
});

test('can update group', async () => {
  const expectedResult = {};
  const resourceApiClientMock: any = {
    updateResource: jest.fn().mockResolvedValue(expectedResult),
  };
  const groups = new GroupApiClient(resourceApiClientMock);

  const groupId = 'test_id';
  const groupData = { schemas: ['urn:scim:schemas:core:1.0'], displayName: 'Updated Group' };
  const attrs = ['displayName', 'members'];
  const actualResult = await groups.updateGroup(groupId, groupData, attrs);

  expect(actualResult).toBe(expectedResult);
  expect(resourceApiClientMock.updateResource).toHaveBeenCalledWith(groupId, groupData, attrs);
});

test('can patch group', async () => {
  const resourceApiClientMock: any = {
    patchResource: jest.fn().mockResolvedValue(undefined),
  };
  const groups = new GroupApiClient(resourceApiClientMock);

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

  const patchResult = await groups.patchGroup(groupId, patchData);

  expect(patchResult).toBeUndefined();
  expect(resourceApiClientMock.patchResource).toHaveBeenCalledWith(groupId, patchData, undefined);
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
  const resourceApiClientMock: any = {
    patchResource: jest.fn().mockResolvedValue(expectedResult),
  };
  const groups = new GroupApiClient(resourceApiClientMock);

  const groupId = 'test_id';
  const patchData: GroupPatchData = {
    schemas: ['urn:scim:schemas:core:1.0', 'urn:scim:schemas:extension:ionic:1.0'],
    meta: {
      attributes: ['members'],
    },
    members: [{ display: 'Jane Doe', value: '4444444444444444444444' }],
  };
  const attrs = ['displayName', 'members'];

  const actualResult = await groups.patchGroup(groupId, patchData, attrs);

  expect(actualResult).toBe(expectedResult);
  expect(resourceApiClientMock.patchResource).toHaveBeenCalledWith(groupId, patchData, attrs);
});

test('can delete group', async () => {
  const resourceApiClientMock: any = {
    deleteResource: jest.fn().mockResolvedValue(undefined),
  };
  const groups = new GroupApiClient(resourceApiClientMock);

  const groupId = 'id_to_delete';
  const result = await groups.deleteGroup(groupId);

  expect(result).toBeUndefined();
  expect(resourceApiClientMock.deleteResource).toHaveBeenCalledWith(groupId);
});
