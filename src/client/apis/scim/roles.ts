import ResourceApiClient from '../resource-api-client';
import { ResourceList, RoleResource, ResourceData } from './resources';
import { QueryParams, ResourceFilterParams } from '../../url-params-builder';

export interface RoleFilterParams extends ResourceFilterParams {
  name?: string;
  createdTs?: number;
  updatedTs?: number;
}

export interface RoleData extends ResourceData {
  name: string;
  displayName?: string;
  description?: string;
  scopes?: string[];
}

export interface RoleUpdateData extends ResourceData {
  name?: string;
  displayName?: string;
  description?: string;
  scopes?: string[];
}

export class RoleApiClient {
  private readonly _client: ResourceApiClient<RoleResource, RoleFilterParams>;

  constructor(resourceApiClient: ResourceApiClient<RoleResource, RoleFilterParams>) {
    this._client = resourceApiClient;
  }

  create(roleData: RoleData): Promise<RoleResource> {
    return this._client.createResource(roleData);
  }

  list(params?: QueryParams<RoleFilterParams>): Promise<ResourceList<RoleResource>> {
    return this._client.getResourceList(params);
  }

  fetch(roleId: string): Promise<RoleResource> {
    return this._client.getResource(roleId);
  }

  update(roleId: string, roleData: RoleUpdateData): Promise<RoleResource> {
    return this._client.updateResource(roleId, roleData);
  }

  delete(roleId: string): Promise<void> {
    return this._client.deleteResource(roleId);
  }
}
