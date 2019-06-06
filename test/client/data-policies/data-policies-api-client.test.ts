import { DataPolicyApiClient } from '../../../src/client/apis/data-policies/data-policies-api-client';

const reqExecutorMock = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
};
const policies = new DataPolicyApiClient(reqExecutorMock as any);

afterEach(() => {
  Object.values(reqExecutorMock).forEach(mock => mock.mockReset());
});

test('can create policy', async () => {
  const expectedPolicy = { id: '123', policyId: 'MyPolicy', description: 'Deny everything' };
  reqExecutorMock.post.mockResolvedValue({ data: expectedPolicy });

  const data = { policyId: 'MyPolicy', description: 'Deny everything' };
  const actualPolicy = await policies.createPolicy(data);

  expect(actualPolicy).toBe(expectedPolicy);
  expect(reqExecutorMock.post).toHaveBeenCalledWith('/policies', data);
});

test('can get policy by id', async () => {
  const expectedPolicy = { id: '123', policyId: 'MyPolicy', description: 'Deny everything' };
  reqExecutorMock.get.mockResolvedValue({ data: expectedPolicy });

  const actualPolicy = await policies.fetchPolicy('123');

  expect(actualPolicy).toBe(expectedPolicy);
  expect(reqExecutorMock.get).toHaveBeenCalledWith('/policies/123');
});

test('can get list of policies', async () => {
  const expectedResult = { totalResults: 100, skip: 0, limit: 10, Resources: [] };
  reqExecutorMock.get.mockResolvedValue({ data: expectedResult });

  const searchParams = { skip: 1, limit: 10 };
  const actualResult = await policies.listPolicies(searchParams);

  expect(actualResult).toBe(expectedResult);
  expect(reqExecutorMock.get).toHaveBeenCalledWith('/policies', { params: searchParams });
});

test('can update policy', async () => {
  const expectedPolicy = { id: '123', policyId: 'UpdatedPolicyName', description: 'Deny everything' };
  reqExecutorMock.put.mockResolvedValue({ data: expectedPolicy });

  const data = { policyId: 'UpdatedPolicyName' };
  const actualPolicy = await policies.updatePolicy('123', data);

  expect(actualPolicy).toBe(expectedPolicy);
  expect(reqExecutorMock.put).toHaveBeenCalledWith('/policies/123', data);
});

test('can create or update multiple policies', async () => {
  const expectedResult = [
    { id: '123', policyId: 'UpdatedPolicyName', description: 'Deny everything' },
    { id: '321', policyId: 'NewPolicyName', description: 'Allow if country is XYZ' },
  ];
  reqExecutorMock.post.mockResolvedValue({ data: expectedResult });

  const data = [
    { id: '123', policyId: 'UpdatedPolicyName' },
    { policyId: 'NewPolicyName', description: 'Allow if country is XYZ' },
  ];
  const actualResult = await policies.createOrUpdatePolicies(data);

  expect(actualResult).toBe(expectedResult);
  expect(reqExecutorMock.post).toHaveBeenCalledWith('/policies', data, undefined);
});

test('can specify "merge" option when creating or updating multiple policies', async () => {
  reqExecutorMock.post.mockResolvedValue({ data: [] });

  const data = [
    { id: '123', policyId: 'UpdatedPolicyName' },
    { policyId: 'NewPolicyName', description: 'Allow if country is XYZ' },
  ];
  await policies.createOrUpdatePolicies(data, 'true');

  expect(reqExecutorMock.post).toHaveBeenCalledWith('/policies', data, { params: { merge: 'true' } });
});

test('can delete policy', async () => {
  const result = await policies.deletePolicy('123');

  expect(result).toBeUndefined();
  expect(reqExecutorMock.delete).toHaveBeenCalledWith('/policies/123');
});
