import ResourceApiClient from '../resource-api-client';
import { GroupResource, ResourceList, ResourceData } from './resources';
import { QueryParams, ResourceFilterParams } from '../../url-params-builder';

export interface GroupData extends ResourceData {
  externalId?: string;
  displayName: string;
  members?: { value: string; type?: string }[];
  [schema: string]: any;
}

export interface GroupPatchData extends ResourceData {
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

export class GroupApiClient {
  private readonly _client: ResourceApiClient<GroupResource, GroupFilterParams>;

  constructor(resourceApiClient: ResourceApiClient<GroupResource, GroupFilterParams>) {
    this._client = resourceApiClient;
  }

  create(groupData: GroupData, attributesToReturn?: string[]): Promise<GroupResource> {
    return this._client.createResource(groupData, attributesToReturn);
  }

  list(params?: QueryParams<GroupFilterParams>): Promise<ResourceList<GroupResource>> {
    return this._client.getResourceList(params);
  }

  fetch(groupId: string, attributesToReturn?: string[]): Promise<GroupResource> {
    return this._client.getResource(groupId, attributesToReturn);
  }

  update(groupId: string, groupData: GroupData, attributesToReturn?: string[]): Promise<GroupResource> {
    return this._client.updateResource(groupId, groupData, attributesToReturn);
  }

  patch(groupId: string, patchData: GroupPatchData): Promise<void>;
  patch(groupId: string, patchData: GroupPatchData, attributesToReturn: string[]): Promise<GroupResource>;
  patch(groupId: string, patchData: GroupPatchData, attributesToReturn?: string[]): Promise<any> {
    return this._client.patchResource(groupId, patchData, attributesToReturn);
  }

  delete(groupId: string): Promise<void> {
    return this._client.deleteResource(groupId);
  }
}
