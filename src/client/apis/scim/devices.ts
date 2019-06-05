import ResourceApiClient from '../resource-api-client';
import { ResourceList, DeviceResource, ResourceData, ResourceQueryParams } from './resources';
import { FilterParams } from '../../url-params-serializer';

export interface DeviceData extends ResourceData {
  name?: string;
  status?: boolean;
  subjectAttributes?: { type: string; value: string }[];
}

export interface DeviceFilterParams extends FilterParams {
  name?: string;
  status?: boolean;
  userId?: string;
  createdTs?: number;
  updatedTs?: number;
}

export class DeviceApiClient {
  private readonly _client: ResourceApiClient<DeviceResource, DeviceFilterParams>;

  constructor(resourceApiClient: ResourceApiClient<DeviceResource, DeviceFilterParams>) {
    this._client = resourceApiClient;
  }

  list(params?: ResourceQueryParams<DeviceFilterParams>): Promise<ResourceList<DeviceResource>> {
    return this._client.getResourceList(params);
  }

  fetch(deviceId: string, attributesToReturn?: string[]): Promise<DeviceResource> {
    return this._client.getResource(deviceId, attributesToReturn);
  }

  update(deviceId: string, deviceData: DeviceData, attributesToReturn?: string[]): Promise<DeviceResource> {
    return this._client.updateResource(deviceId, deviceData, attributesToReturn);
  }

  delete(deviceId: string): Promise<void> {
    return this._client.deleteResource(deviceId);
  }
}
