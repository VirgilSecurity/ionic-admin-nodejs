import ApiClient from '../api-client';
import { UserResource, ResourceList } from './resources';
import { buildUrlParams, ResourceFilterParams, QueryParams } from '../../url-params-builder';

export interface UserData {
  schemas?: string[];
  name: { givenName?: string; familyName?: string; formatted?: string };
  externalId?: string;
  emails?: { value: string; type?: string; primary?: boolean }[];
  roles?: { value: string }[];
  userName?: string;
  [schema: string]: any;
}

export interface UserFilterParams extends ResourceFilterParams {
  domainUpn?: string;
  email?: string | string[];
  enabled?: boolean;
  externalId?: string;
  groups?: string | string[];
  roles?: string | string[];
  createdTs?: number;
  updatedTs?: number;
}

export default class UserApiClient extends ApiClient {
  async create(userData: UserData, attributesToReturn?: string[]): Promise<UserResource> {
    const response = await this.requestExecutor.post<UserResource>(this.prefix, userData, {
      params: attributesToReturn ? buildUrlParams({ attributes: attributesToReturn }) : undefined,
    });
    return response.data;
  }

  async list(params?: QueryParams<UserFilterParams>): Promise<ResourceList<UserResource>> {
    const response = await this.requestExecutor.get<ResourceList<UserResource>>(this.prefix, {
      params: params ? buildUrlParams(params) : undefined,
    });
    return response.data;
  }

  async fetch(userId: string, attributesToReturn?: string[]): Promise<UserResource> {
    const response = await this.requestExecutor.get<UserResource>(this.prefix + '/' + userId, {
      params: attributesToReturn ? buildUrlParams({ attributes: attributesToReturn }) : undefined,
    });
    return response.data;
  }

  async update(userId: string, userData: UserData, attributesToReturn?: string[]): Promise<UserResource> {
    const response = await this.requestExecutor.put<UserResource>(this.prefix + '/' + userId, userData, {
      params: attributesToReturn ? buildUrlParams({ attributes: attributesToReturn }) : undefined,
    });
    return response.data;
  }

  async delete(userId: string): Promise<void> {
    await this.requestExecutor.delete(this.prefix + '/' + userId);
  }
}
