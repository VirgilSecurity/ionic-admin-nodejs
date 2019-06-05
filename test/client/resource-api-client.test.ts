import ResourceApiClient from '../../src/client/apis/resource-api-client';
import { Resource, ResourceData } from '../../src/client/apis/scim/resources';
import { FilterParams } from '../../src/client/url-params-serializer';

interface MockResource extends Resource {
  id: string;
  name?: string;
  props?: string[];
}

interface MockResourceFilterParams extends FilterParams {
  name?: string;
  props?: { value: string }[];
}

interface MockResourceData extends ResourceData {
  name: string;
  props?: { value: string }[];
}

test('can create resource', async () => {
  const expectedResource = {
    id: 'test',
  };
  const reqExecutorMock: any = {
    post: jest.fn().mockResolvedValue({ data: expectedResource }),
  };
  const client = new ResourceApiClient<MockResource, MockResourceFilterParams>(reqExecutorMock, '/TestResources');
  const resourceData: MockResourceData = { schemas: ['urn:scim:schemas:core:1.0'], name: 'Test Group' };

  const actualResource = await client.createResource(resourceData);
  const [actualUrl, actualData, actualConfig] = reqExecutorMock.post.mock.calls[0];

  expect(actualResource).toBe(expectedResource);
  expect(actualUrl).toBe('/TestResources');
  expect(actualData).toBe(resourceData);
  expect(actualConfig.params).toBeUndefined();
});

test('can specify attributes to return after creating resource', async () => {
  const reqExecutorMock: any = {
    post: jest.fn().mockResolvedValue({ data: {} }),
  };
  const client = new ResourceApiClient<MockResource, MockResourceFilterParams>(reqExecutorMock, '/TestResources');
  const resourceData: MockResourceData = { schemas: ['urn:scim:schemas:core:1.0'], name: 'Test Resource' };

  await client.createResource(resourceData, ['name', 'props']);

  const [, , actualConfig] = reqExecutorMock.post.mock.calls[0];
  expect(actualConfig.params.attributes).toEqual(['name', 'props']);
});

test('can get resource list', async () => {
  const expectedResult = {};
  const reqExecutorMock: any = {
    get: jest.fn().mockResolvedValue({ data: expectedResult }),
  };
  const client = new ResourceApiClient<MockResource, MockResourceFilterParams>(reqExecutorMock, '/TestResources');

  const result = await client.getResourceList();

  const [actualUrl, actualConfig] = reqExecutorMock.get.mock.calls[0];
  expect(result).toBe(expectedResult);
  expect(actualUrl).toBe('/TestResources');
  expect(actualConfig.params).toBeUndefined();
});

test('can search and limit the returned number of resources', async () => {
  const reqExecutorMock: any = {
    get: jest.fn().mockResolvedValue({ data: {} }),
  };
  const client = new ResourceApiClient<MockResource, MockResourceFilterParams>(reqExecutorMock, '/TestResources');
  const searchParams = { skip: 1, limit: 10, filter: { name: 'MyResource' } };

  await client.getResourceList(searchParams);

  const [, actualConfig] = reqExecutorMock.get.mock.calls[0];
  expect(actualConfig.params).toEqual(searchParams);
});

test('can get resource by id', async () => {
  const resourceId = 'test_id';
  const expectedResource = {};
  const reqExecutorMock: any = {
    get: jest.fn().mockResolvedValue({ data: expectedResource }),
  };
  const client = new ResourceApiClient<MockResource, MockResourceFilterParams>(reqExecutorMock, '/TestResources');

  const actualResource = await client.getResource(resourceId);

  const [actualUrl, actualConfig] = reqExecutorMock.get.mock.calls[0];
  expect(actualResource).toBe(expectedResource);
  expect(actualUrl).toBe('/TestResources/test_id');
  expect(actualConfig.params).toBeUndefined();
});

test('can specify attributes to return when fetching resource by id', async () => {
  const reqExecutorMock: any = {
    get: jest.fn().mockResolvedValue({ data: {} }),
  };
  const client = new ResourceApiClient<MockResource, MockResourceFilterParams>(reqExecutorMock, '/TestResources');

  await client.getResource('test_id', ['name', 'props']);

  const [, actualConfig] = reqExecutorMock.get.mock.calls[0];
  expect(actualConfig.params.attributes).toEqual(['name', 'props']);
});

test('can update resource', async () => {
  const resourceId = 'test_id';
  const expectedResult = {};
  const reqExecutorMock: any = {
    put: jest.fn().mockResolvedValue({ data: expectedResult }),
  };
  const client = new ResourceApiClient<MockResource, MockResourceFilterParams>(reqExecutorMock, '/TestResources');
  const resourceData = { schemas: ['urn:scim:schemas:core:1.0'], name: 'NewName' };

  const actualResult = await client.updateResource(resourceId, resourceData);

  const [actualUrl, actualData, actualConfig] = reqExecutorMock.put.mock.calls[0];
  expect(actualResult).toBe(expectedResult);
  expect(actualUrl).toBe('/TestResources/test_id');
  expect(actualData).toBe(resourceData);
  expect(actualConfig.params).toBeUndefined();
});

test('can specify attributes to return after updating resource', async () => {
  const reqExecutorMock: any = {
    put: jest.fn().mockResolvedValue({ data: {} }),
  };
  const client = new ResourceApiClient<MockResource, MockResourceFilterParams>(reqExecutorMock, '/TestResources');
  const updateData = { schemas: ['urn:scim:schemas:core:1.0'], name: 'NewName' };

  await client.updateResource('test_id', updateData, ['name', 'props']);

  const [, , actualConfig] = reqExecutorMock.put.mock.calls[0];
  expect(actualConfig.params.attributes).toEqual(['name', 'props']);
});

test('can patch resource', async () => {
  const reqExecutorMock: any = {
    patch: jest.fn().mockResolvedValue({}),
  };
  const client = new ResourceApiClient<MockResource, MockResourceFilterParams>(reqExecutorMock, '/TestResources');
  const resourceId = 'test_id';
  const patchData = {
    schemas: ['urn:scim:schemas:core:1.0', 'urn:scim:schemas:extension:ionic:1.0'],
    props: [
      {
        value: 'to_be_removed',
        operation: 'delete',
      },
      {
        value: 'to_be_added',
      },
    ],
    name: 'NewName',
  };

  const patchResult = await client.patchResource(resourceId, patchData);

  const [actualUrl, actualData, actualConfig] = reqExecutorMock.patch.mock.calls[0];
  // If the attributes parameter is not included, then no content is returned.
  expect(patchResult).toBeUndefined();
  expect(actualUrl).toBe('/TestResources/test_id');
  expect(actualData).toBe(patchData);
  expect(actualConfig.params).toBeUndefined();
});

test('can specify attributes to return after patching resource', async () => {
  const expectedResult = {
    schemas: ['urn:scim:schemas:core:1.0', 'urn:scim:schemas:extension:ionic:1.0'],
    props: [
      {
        value: 'to_be_added',
      },
    ],
  };
  const reqExecutorMock: any = {
    patch: jest.fn().mockResolvedValue({ data: expectedResult }),
  };
  const client = new ResourceApiClient<MockResource, MockResourceFilterParams>(reqExecutorMock, '/TestResources');
  const patchData = {
    schemas: ['urn:scim:schemas:core:1.0', 'urn:scim:schemas:extension:ionic:1.0'],
    meta: {
      attributes: ['props'],
    },
    props: [{ value: 'to_be_added' }],
  };

  const actualResult = await client.patchResource('test_id', patchData, ['name', 'props']);

  const [, actualData, actualConfig] = reqExecutorMock.patch.mock.calls[0];
  expect(actualResult).toBe(expectedResult);
  expect(actualData).toBe(patchData);
  expect(actualConfig.params.attributes).toEqual(['name', 'props']);
});

test('can delete resource', async () => {
  const reqExecutorMock: any = {
    delete: jest.fn().mockResolvedValue({}),
  };
  const client = new ResourceApiClient<MockResource, MockResourceFilterParams>(reqExecutorMock, '/TestResources');
  const resourceId = 'id_to_delete';

  const result = await client.deleteResource(resourceId);

  const [actualUrl] = reqExecutorMock.delete.mock.calls[0];
  expect(result).toBeUndefined();
  expect(actualUrl).toBe('/TestResources/id_to_delete');
});
