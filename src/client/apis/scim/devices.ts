import ApiClient from '../api-client';
import { GroupResource, ResourceList } from './resources';
import { buildUrlParams, QueryParams, ResourceFilterParams } from '../../url-params-builder';

export interface DeviceData {
  schemas: string[];
  name?: string;
  status?: boolean;
  subjectAttributes?: { type: string; value: string }[];
}

export interface DeviceFilterParams extends ResourceFilterParams {
  name: string;
  status: boolean;
  userId: string;
  createdTs: number;
  updatedTs: number;
}

export class DeviceApiClient extends ApiClient {
  async list(params?: QueryParams<DeviceFilterParams>): Promise<ResourceList<GroupResource>> {
    const response = await this.requestExecutor.get<ResourceList<GroupResource>>(this.prefix, {
      params: params ? buildUrlParams(params) : undefined,
    });
    return response.data;
  }

  async fetch(deviceId: string, attributesToReturn?: string[]): Promise<GroupResource> {
    const response = await this.requestExecutor.get<GroupResource>(this.prefix + '/' + deviceId, {
      params: attributesToReturn ? buildUrlParams({ attributes: attributesToReturn }) : undefined,
    });
    return response.data;
  }

  async update(deviceId: string, deviceData: DeviceData, attributesToReturn?: string[]): Promise<GroupResource> {
    const response = await this.requestExecutor.put<GroupResource>(this.prefix + '/' + deviceId, deviceData, {
      params: attributesToReturn ? buildUrlParams({ attributes: attributesToReturn }) : undefined,
    });
    return response.data;
  }

  async delete(deviceId: string): Promise<void> {
    await this.requestExecutor.delete(this.prefix + '/' + deviceId);
  }
}
