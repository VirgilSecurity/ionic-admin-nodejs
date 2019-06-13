import { DataMarkingApiClient } from '../../../src/client/apis/data-markings/data-markings-api-client';

const reqExecutorMock = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
};
const markings = new DataMarkingApiClient(reqExecutorMock as any);

afterEach(() => {
  Object.values(reqExecutorMock).forEach(mock => mock.mockReset());
});

test('can create data marking', async () => {
  const expectedMarking = { id: 'new_marking' };
  reqExecutorMock.post.mockResolvedValue({ data: expectedMarking });

  const data = { name: 'MyMarking' };
  const actualMarking = await markings.createMarking(data);

  expect(actualMarking).toBe(expectedMarking);
  expect(reqExecutorMock.post).toHaveBeenCalledWith('/markings', data);
});

test('can get data marking list', async () => {
  const expectedResult = { totalResults: 100, Resources: [] };
  reqExecutorMock.get.mockResolvedValue({ data: expectedResult });

  const searchParams = { skip: 0, limit: 10, valueLimit: 3 };
  const actualResult = await markings.listMarkings(searchParams);

  expect(actualResult).toBe(expectedResult);
  expect(reqExecutorMock.get).toHaveBeenCalledWith('/markings', { params: searchParams });
});

test('can get data marking by id', async () => {
  const markingId = 'marking_id';
  const expectedMarking = { id: markingId };
  reqExecutorMock.get.mockResolvedValue({ data: expectedMarking });

  const actualMarking = await markings.fetchMarking(markingId);

  expect(actualMarking).toBe(expectedMarking);
  expect(reqExecutorMock.get).toHaveBeenCalledWith('/markings/marking_id', { params: undefined });
});

test('can specify value limit when fetching marking', async () => {
  const markingId = 'marking_id';
  const expectedMarking = { id: markingId };
  reqExecutorMock.get.mockResolvedValue({ data: expectedMarking });

  const valueLimit = 10;
  const actualMarking = await markings.fetchMarking(markingId, { valueLimit });

  expect(actualMarking).toBe(expectedMarking);
  expect(reqExecutorMock.get).toHaveBeenCalledWith('/markings/marking_id', { params: { valueLimit } });
});

test('can update marking', async () => {
  const expectedMarking = { id: 'marking_id', name: 'NewName' };
  reqExecutorMock.put.mockResolvedValue({ data: expectedMarking });

  const updateData = { name: 'NewName', description: 'NewDescription' };
  const updatedMarking = await markings.updateMarking('marking_id', updateData);

  expect(updatedMarking).toBe(expectedMarking);
  expect(reqExecutorMock.put).toHaveBeenCalledWith('/markings/marking_id', updateData);
});

test('can create or update multiple markings', async () => {
  const expectedResult = [{ id: 'created_id', name: 'CreatedName' }, { id: 'updated_id', name: 'UpdatedName' }];
  reqExecutorMock.post.mockResolvedValue({ data: expectedResult });

  const data = [{ name: 'CreatedName' }, { id: 'updated_id', name: 'UpdatedName' }];
  const actualResult = await markings.createOrUpdateMarkings(data);

  expect(actualResult).toBe(expectedResult);
  expect(reqExecutorMock.post).toHaveBeenCalledWith('/markings', data);
});

test('can delete marking', async () => {
  reqExecutorMock.delete.mockResolvedValue({ data: {} });

  const actualResult = await markings.deleteMarking('marking_id');

  expect(actualResult).toBeUndefined();
  expect(reqExecutorMock.delete).toHaveBeenCalledWith('/markings/marking_id');
});

test('can get marking values list', async () => {
  const expectedResult = { totalResults: 100, Resources: [] };
  reqExecutorMock.get.mockResolvedValue({ data: expectedResult });

  const searchParams = { startIndex: 1, count: 100 };
  const actualResult = await markings.listValues('marking_id', searchParams);

  expect(actualResult).toBe(expectedResult);
  expect(reqExecutorMock.get).toHaveBeenCalledWith('/markings/marking_id/values', { params: searchParams });
});

test('can get marking value by id', async () => {
  const expectedValue = { id: 'value_id', name: 'ValueName' };
  reqExecutorMock.get.mockResolvedValue({ data: expectedValue });

  const actualValue = await markings.fetchValue('marking_id', 'value_id');

  expect(actualValue).toBe(expectedValue);
  expect(reqExecutorMock.get).toHaveBeenCalledWith('/markings/marking_id/values/value_id');
});

test('can create marking value', async () => {
  const expectedValue = { id: 'value_id', name: 'ValueName' };
  reqExecutorMock.post.mockResolvedValue({ data: expectedValue });

  const data = { name: 'ValueName' };
  const actualValue = await markings.createValue('marking_id', data);

  expect(actualValue).toBe(expectedValue);
  expect(reqExecutorMock.post).toHaveBeenCalledWith('/markings/marking_id/values', data);
});

test('can update marking value', async () => {
  const expectedValue = { id: 'value_id', name: 'NewName' };
  reqExecutorMock.put.mockResolvedValue({ data: expectedValue });

  const data = { name: 'NewName' };
  const actualValue = await markings.updateValue('marking_id', 'value_id', data);

  expect(actualValue).toBe(expectedValue);
  expect(reqExecutorMock.put).toHaveBeenCalledWith('/markings/marking_id/values/value_id', data);
});

test('can delete marking value', async () => {
  reqExecutorMock.delete.mockResolvedValue({ data: {} });

  const actualResult = await markings.deleteValue('marking_id', 'value_id');

  expect(actualResult).toBeUndefined();
  expect(reqExecutorMock.delete).toHaveBeenCalledWith('/markings/marking_id/values/value_id');
});
