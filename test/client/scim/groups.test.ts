import { GroupApiClient, GroupPatchData } from '../../../src/client/apis/scim/groups';
import { IonicUrlParams } from '../../../src/client/url-params-builder';

test('can create group', async () => {
  const expectedGroup = {
    id: 'test',
  };
  const reqExecutorMock: any = {
    post: jest.fn().mockResolvedValue({ data: expectedGroup }),
  };
  const groups = new GroupApiClient(reqExecutorMock, '/TestGroups');

  expect.assertions(4);

  const groupData = { displayName: 'Test Group' };
  const actualGroup = await groups.create(groupData);
  const [actualUrl, actualData, actualConfig] = reqExecutorMock.post.mock.calls[0];

  expect(actualGroup).toBe(expectedGroup);
  expect(actualUrl).toBe('/TestGroups');
  expect(actualData).toBe(groupData);
  expect(actualConfig.params).toBeUndefined();
});

test('can specify attributes to return after creating group', async () => {
  const reqExecutorMock: any = {
    post: jest.fn().mockResolvedValue({ data: {} }),
  };
  const groups = new GroupApiClient(reqExecutorMock, '/TestGroups');

  expect.assertions(2);
  const groupData = { displayName: 'Test' };
  await groups.create(groupData, ['displayName', 'members']);
  const [, , actualConfig] = reqExecutorMock.post.mock.calls[0];
  expect(actualConfig.params).toBeInstanceOf(IonicUrlParams);
  expect(actualConfig.params.params.attributes).toBe('displayName,members');
});

test('can list groups', async () => {
  const expectedResult = {};
  const reqExecutorMock: any = {
    get: jest.fn().mockResolvedValue({ data: expectedResult }),
  };
  const groups = new GroupApiClient(reqExecutorMock, '/TestGroups');

  expect.assertions(3);
  const result = await groups.list();
  const [actualUrl, actualConfig] = reqExecutorMock.get.mock.calls[0];
  expect(result).toBe(expectedResult);
  expect(actualUrl).toBe('/TestGroups');
  expect(actualConfig.params).toBeUndefined();
});

test('can provide search params', async () => {
  const reqExecutorMock: any = {
    get: jest.fn().mockResolvedValue({ data: {} }),
  };
  const groups = new GroupApiClient(reqExecutorMock, '/TestGroups');
  expect.assertions(4);
  await groups.list({ skip: 1, limit: 10, filter: { name: 'MyGroup' } });
  const [, actualConfig] = reqExecutorMock.get.mock.calls[0];
  expect(actualConfig.params).toBeInstanceOf(IonicUrlParams);
  expect(actualConfig.params.params.skip).toBe(1);
  expect(actualConfig.params.params.limit).toBe(10);
  expect(actualConfig.params.params.name).toBe('MyGroup');
});

test('can fetch group', async () => {
  const groupId = 'test_id';
  const expectedGroup = {};
  const reqExecutorMock: any = {
    get: jest.fn().mockResolvedValue({ data: expectedGroup }),
  };
  const groups = new GroupApiClient(reqExecutorMock, '/TestGroups');

  expect.assertions(3);
  const actualGroup = await groups.fetch(groupId);
  const [actualUrl, actualConfig] = reqExecutorMock.get.mock.calls[0];
  expect(actualGroup).toBe(expectedGroup);
  expect(actualUrl).toBe('/TestGroups/test_id');
  expect(actualConfig.params).toBeUndefined();
});

test('can specify attributes to return when fetching', async () => {
  const reqExecutorMock: any = {
    get: jest.fn().mockResolvedValue({ data: {} }),
  };
  const groups = new GroupApiClient(reqExecutorMock, '/TestGroups');

  expect.assertions(2);
  await groups.fetch('test_id', ['displayName', 'members']);
  const [, actualConfig] = reqExecutorMock.get.mock.calls[0];
  expect(actualConfig.params).toBeInstanceOf(IonicUrlParams);
  expect(actualConfig.params.params.attributes).toBe('displayName,members');
});

test('can update group', async () => {
  const groupId = 'test_id';
  const expectedResult = {};
  const reqExecutorMock: any = {
    put: jest.fn().mockResolvedValue({ data: expectedResult }),
  };
  const groups = new GroupApiClient(reqExecutorMock, '/TestGroups');

  expect.assertions(4);
  const groupData = { schemas: ['urn:scim:schemas:core:1.0'], displayName: 'Updated Group' };
  const actualResult = await groups.update(groupId, groupData);
  const [actualUrl, actualData, actualConfig] = reqExecutorMock.put.mock.calls[0];
  expect(actualResult).toBe(expectedResult);
  expect(actualUrl).toBe('/TestGroups/test_id');
  expect(actualData).toBe(groupData);
  expect(actualConfig.params).toBeUndefined();
});

test('can specify attributes to return after update', async () => {
  const reqExecutorMock: any = {
    put: jest.fn().mockResolvedValue({ data: {} }),
  };
  const groups = new GroupApiClient(reqExecutorMock, '/TestGroups');

  expect.assertions(2);
  const updateData = { schemas: ['urn:scim:schemas:core:1.0'], displayName: 'Updated Group' };
  await groups.update('test_id', updateData, ['displayName', 'members']);
  const [, , actualConfig] = reqExecutorMock.put.mock.calls[0];
  expect(actualConfig.params).toBeInstanceOf(IonicUrlParams);
  expect(actualConfig.params.params.attributes).toBe('displayName,members');
});

test('can patch group', async () => {
  const reqExecutorMock: any = {
    patch: jest.fn().mockResolvedValue({}),
  };
  const groups = new GroupApiClient(reqExecutorMock, '/TestGroups');
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

  expect.assertions(4);
  const patchResult = await groups.patch(groupId, patchData);
  const [actualUrl, actualData, actualConfig] = reqExecutorMock.patch.mock.calls[0];
  // If the attributes parameter is not included, then no content is returned.
  expect(patchResult).toBeUndefined();
  expect(actualUrl).toBe('/TestGroups/test_id');
  expect(actualData).toBe(patchData);
  expect(actualConfig.params).toBeUndefined();
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
  const reqExecutorMock: any = {
    patch: jest.fn().mockResolvedValue({ data: expectedResult }),
  };
  const groups = new GroupApiClient(reqExecutorMock, '/TestGroups');
  const patchData: GroupPatchData = {
    schemas: ['urn:scim:schemas:core:1.0', 'urn:scim:schemas:extension:ionic:1.0'],
    meta: {
      attributes: ['members'],
    },
    members: [{ display: 'Jane Doe', value: '4444444444444444444444' }],
  };

  expect.assertions(4);
  const actualResult = await groups.patch('test_id', patchData, ['displayName', 'members']);
  const [, actualData, actualConfig] = reqExecutorMock.patch.mock.calls[0];
  expect(actualResult).toBe(expectedResult);
  expect(actualData).toBe(patchData);
  expect(actualConfig.params).toBeInstanceOf(IonicUrlParams);
  expect(actualConfig.params.params.attributes).toBe('displayName,members');
});

test('can delete group', async () => {
  const reqExecutorMock: any = {
    delete: jest.fn().mockResolvedValue({}),
  };
  const groups = new GroupApiClient(reqExecutorMock, '/TestGroups');
  const groupId = 'id_to_delete';

  expect.assertions(2);
  const result = await groups.delete(groupId);
  const [actualUrl] = reqExecutorMock.delete.mock.calls[0];
  expect(result).toBeUndefined();
  expect(actualUrl).toBe('/TestGroups/id_to_delete');
});
