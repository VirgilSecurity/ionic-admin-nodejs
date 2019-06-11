import ResourceApiClient from '../resource-api-client';
import { UserResource, ResourceList, ResourceData, ResourceQueryParams } from './resources';
import { FilterParams } from '../../url-params-serializer';

export interface UserData extends ResourceData {
  name: { givenName?: string; familyName?: string; formatted?: string };
  externalId?: string;
  emails?: { value: string; type?: string; primary?: boolean }[];
  roles?: { value: string }[];
  userName?: string;
  [schema: string]: any;
}

export interface UserFilterParams extends FilterParams {
  domainUpn?: string;
  email?: string | string[];
  enabled?: boolean;
  externalId?: string;
  groups?: string | string[];
  roles?: string | string[];
  createdTs?: number;
  updatedTs?: number;
}

export class UserApiClient {
  private readonly _client: ResourceApiClient<UserResource, UserFilterParams>;

  constructor(resourceApiClient: ResourceApiClient<UserResource, UserFilterParams>) {
    this._client = resourceApiClient;
  }

  createUser(userData: UserData, attributesToReturn?: string[]): Promise<UserResource> {
    return this._client.createResource(userData, attributesToReturn);
  }

  listUsers(params?: ResourceQueryParams<UserFilterParams>): Promise<ResourceList<UserResource>> {
    return this._client.getResourceList(params);
  }

  fetchUser(userId: string, attributesToReturn?: string[]): Promise<UserResource> {
    return this._client.getResource(userId, attributesToReturn);
  }

  updateUser(userId: string, userData: UserData, attributesToReturn?: string[]): Promise<UserResource> {
    return this._client.updateResource(userId, userData, attributesToReturn);
  }

  deleteUser(userId: string): Promise<void> {
    return this._client.deleteResource(userId);
  }
}
