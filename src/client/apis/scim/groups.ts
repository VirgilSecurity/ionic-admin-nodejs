import ApiClient from '../api-client';
import { GroupResource, ResourceList } from './resources';
import { buildUrlParams, QueryParams, ResourceFilterParams } from '../../url-params-builder';

export interface GroupData {
  schemas?: string[];
  externalId?: string;
  displayName: string;
  members?: { value: string; type?: string }[];
  [schema: string]: any;
}

export interface GroupPatchData {
  schemas: string[];
  externalId?: string;
  displayName?: string;
  members?: { value: string; display?: string; operation?: 'delete' }[];
  meta?: { attributes: string[] };
}

export interface GroupFilterParams extends ResourceFilterParams {
  externalId?: string;
  description?: string;
  name?: string;
  createdTs?: number;
  updatedTs?: number;
}

export class GroupApiClient extends ApiClient {
  async create(groupData: GroupData, attributesToReturn?: string[]): Promise<GroupResource> {
    const response = await this.requestExecutor.post<GroupResource>(this.prefix, groupData, {
      params: attributesToReturn ? buildUrlParams({ attributes: attributesToReturn }) : undefined,
    });
    return response.data;
  }

  async list(params?: QueryParams<GroupFilterParams>): Promise<ResourceList<GroupResource>> {
    const response = await this.requestExecutor.get<ResourceList<GroupResource>>(this.prefix, {
      params: params ? buildUrlParams(params) : undefined,
    });
    return response.data;
  }

  async fetch(groupId: string, attributesToReturn?: string[]): Promise<GroupResource> {
    const response = await this.requestExecutor.get<GroupResource>(this.prefix + '/' + groupId, {
      params: attributesToReturn ? buildUrlParams({ attributes: attributesToReturn }) : undefined,
    });
    return response.data;
  }

  async update(groupId: string, groupData: GroupData, attributesToReturn?: string[]): Promise<GroupResource> {
    const response = await this.requestExecutor.put<GroupResource>(this.prefix + '/' + groupId, groupData, {
      params: attributesToReturn ? buildUrlParams({ attributes: attributesToReturn }) : undefined,
    });
    return response.data;
  }

  async patch(groupId: string, patchData: GroupPatchData): Promise<void>;
  async patch(groupId: string, patchData: GroupPatchData, attributesToReturn: string[]): Promise<GroupResource>;
  async patch(groupId: string, patchData: GroupPatchData, attributesToReturn?: string[]): Promise<any> {
    const response = await this.requestExecutor.patch<GroupResource>(this.prefix + '/' + groupId, patchData, {
      params: attributesToReturn ? buildUrlParams({ attributes: attributesToReturn }) : undefined,
    });
    if (attributesToReturn) {
      return response.data;
    }
  }

  async delete(groupId: string): Promise<void> {
    await this.requestExecutor.delete(this.prefix + '/' + groupId);
  }
}
