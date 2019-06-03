import { DeviceApiClient } from '../../../src/client/apis/scim/devices';
import { IonicUrlParams } from '../../../src/client/url-params-builder';

test('can list devices', async () => {
  const expectedResult = {};
  const reqExecutorMock: any = {
    get: jest.fn().mockResolvedValue({ data: expectedResult }),
  };
  const devices = new DeviceApiClient(reqExecutorMock, '/TestDevices');

  expect.assertions(3);
  const result = await devices.list();
  const [actualUrl, actualConfig] = reqExecutorMock.get.mock.calls[0];
  expect(result).toBe(expectedResult);
  expect(actualUrl).toBe('/TestDevices');
  expect(actualConfig.params).toBeUndefined();
});

test('can provide search params', async () => {
  const reqExecutorMock: any = {
    get: jest.fn().mockResolvedValue({ data: {} }),
  };
  const devices = new DeviceApiClient(reqExecutorMock, '/TestDevices');
  expect.assertions(4);
  await devices.list({ skip: 1, limit: 10, filter: { name: 'MyDevice' } });
  const [, actualConfig] = reqExecutorMock.get.mock.calls[0];
  expect(actualConfig.params).toBeInstanceOf(IonicUrlParams);
  expect(actualConfig.params.params.skip).toBe(1);
  expect(actualConfig.params.params.limit).toBe(10);
  expect(actualConfig.params.params.name).toBe('MyDevice');
});

test('can fetch device', async () => {
  const deviceId = 'test_id';
  const expectedDevice = {};
  const reqExecutorMock: any = {
    get: jest.fn().mockResolvedValue({ data: expectedDevice }),
  };
  const devices = new DeviceApiClient(reqExecutorMock, '/TestDevices');

  expect.assertions(3);
  const actualDevice = await devices.fetch(deviceId);
  const [actualUrl, actualConfig] = reqExecutorMock.get.mock.calls[0];
  expect(actualDevice).toBe(expectedDevice);
  expect(actualUrl).toBe('/TestDevices/test_id');
  expect(actualConfig.params).toBeUndefined();
});

test('can specify attributes to return when fetching', async () => {
  const reqExecutorMock: any = {
    get: jest.fn().mockResolvedValue({ data: {} }),
  };
  const devices = new DeviceApiClient(reqExecutorMock, '/TestDevices');

  expect.assertions(2);
  await devices.fetch('test_id', ['keySpace', 'displayName', 'user']);
  const [, actualConfig] = reqExecutorMock.get.mock.calls[0];
  expect(actualConfig.params).toBeInstanceOf(IonicUrlParams);
  expect(actualConfig.params.params.attributes).toBe('keySpace,displayName,user');
});

test('can update device', async () => {
  const deviceId = 'test_id';
  const expectedResult = {};
  const reqExecutorMock: any = {
    put: jest.fn().mockResolvedValue({ data: expectedResult }),
  };
  const devices = new DeviceApiClient(reqExecutorMock, '/TestDevices');

  expect.assertions(4);
  const deviceData = { schemas: ['urn:scim:schemas:core:1.0'], name: 'NewDeviceName', status: false };
  const actualResult = await devices.update(deviceId, deviceData);
  const [actualUrl, actualData, actualConfig] = reqExecutorMock.put.mock.calls[0];
  expect(actualResult).toBe(expectedResult);
  expect(actualUrl).toBe('/TestDevices/test_id');
  expect(actualData).toBe(deviceData);
  expect(actualConfig.params).toBeUndefined();
});

test('can specify attributes to return after update', async () => {
  const reqExecutorMock: any = {
    put: jest.fn().mockResolvedValue({ data: {} }),
  };
  const devices = new DeviceApiClient(reqExecutorMock, '/TestDevices');

  expect.assertions(2);
  const updateData = { schemas: ['urn:scim:schemas:core:1.0'], status: true };
  await devices.update('test_id', updateData, ['keySpace', 'user']);
  const [, , actualConfig] = reqExecutorMock.put.mock.calls[0];
  expect(actualConfig.params).toBeInstanceOf(IonicUrlParams);
  expect(actualConfig.params.params.attributes).toBe('keySpace,user');
});

test('can delete device', async () => {
  const reqExecutorMock: any = {
    delete: jest.fn().mockResolvedValue({}),
  };
  const devices = new DeviceApiClient(reqExecutorMock, '/TestDevices');
  const deviceId = 'id_to_delete';

  expect.assertions(2);
  const result = await devices.delete(deviceId);
  const [actualUrl] = reqExecutorMock.delete.mock.calls[0];
  expect(result).toBeUndefined();
  expect(actualUrl).toBe('/TestDevices/id_to_delete');
});
