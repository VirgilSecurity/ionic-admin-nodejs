import { DeviceApiClient } from '../../../src/client/apis/scim/devices';

test('can get device list', async () => {
  const expectedResult = {};
  const resourceApiClientMock: any = {
    getResourceList: jest.fn().mockResolvedValue(expectedResult),
  };
  const devices = new DeviceApiClient(resourceApiClientMock);

  const params = { skip: 10, filter: { userId: '123456' } };
  const result = await devices.list(params);

  expect(result).toBe(expectedResult);
  expect(resourceApiClientMock.getResourceList).toHaveBeenCalledWith(params);
});

test('can fetch device', async () => {
  const expectedDevice = {};
  const resourceApiClientMock: any = {
    getResource: jest.fn().mockResolvedValue(expectedDevice),
  };
  const devices = new DeviceApiClient(resourceApiClientMock);

  const deviceId = 'test_id';
  const attrs = ['keySpace', 'displayName', 'user'];
  const actualDevice = await devices.fetch(deviceId, attrs);

  expect(actualDevice).toBe(expectedDevice);
  expect(resourceApiClientMock.getResource).toHaveBeenCalledWith(deviceId, attrs);
});

test('can update device', async () => {
  const expectedResult = {};
  const resourceApiClientMock: any = {
    updateResource: jest.fn().mockResolvedValue(expectedResult),
  };
  const devices = new DeviceApiClient(resourceApiClientMock);

  const deviceId = 'test_id';
  const deviceData = { schemas: ['urn:scim:schemas:core:1.0'], name: 'NewDeviceName', status: false };
  const attrs = ['keySpace', 'user'];

  const actualResult = await devices.update(deviceId, deviceData, attrs);
  expect(actualResult).toBe(expectedResult);
  expect(resourceApiClientMock.updateResource).toBeCalledWith(deviceId, deviceData, attrs);
});

test('can delete device', async () => {
  const resourceApiClientMock: any = {
    deleteResource: jest.fn().mockResolvedValue(undefined),
  };
  const devices = new DeviceApiClient(resourceApiClientMock);

  const deviceId = 'id_to_delete';
  const result = await devices.delete(deviceId);
  expect(result).toBeUndefined();
  expect(resourceApiClientMock.deleteResource).toHaveBeenCalledWith(deviceId);
});
