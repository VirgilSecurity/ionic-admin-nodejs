import RequestExecutor from '../../request-executor';
import ResourceApiClient from './resource-api-client';
import { UserFilterParams, UserData, UserResource } from './users';
import { GroupFilterParams, GroupData, GroupPatchData, GroupResource } from './groups';
import { RoleFilterParams, RoleData, RoleUpdateData, RoleResource } from './roles';
import { DeviceFilterParams, DeviceData, DeviceResource } from './devices';
import { ResourceQueryParams, ResourceList, ScopeList } from './resources';

const Schemas = {
  Core: 'urn:scim:schemas:core:1.0',
  Ionic: 'urn:scim:schemas:extension:ionic:1.0',
  Enterprise: 'urn:scim:schemas:extension:enterprise:1.0',
};

export class ScimApiClient {
  private readonly _requestExecutor: RequestExecutor;
  private readonly _users: ResourceApiClient<UserResource, UserFilterParams>;
  private readonly _groups: ResourceApiClient<GroupResource, GroupFilterParams>;
  private readonly _roles: ResourceApiClient<RoleResource, RoleFilterParams>;
  private readonly _devices: ResourceApiClient<DeviceResource, DeviceFilterParams>;

  get Schemas() {
    return Schemas;
  }

  constructor(requestExecutor: RequestExecutor) {
    this._requestExecutor = requestExecutor;
    this._users = new ResourceApiClient(requestExecutor, '/scim/Users');
    this._groups = new ResourceApiClient(requestExecutor, '/scim/Groups');
    this._roles = new ResourceApiClient(requestExecutor, '/scim/Roles');
    this._devices = new ResourceApiClient(requestExecutor, '/scim/Devices');
  }

  async listScopes(): Promise<ScopeList> {
    const response = await this._requestExecutor.get<ScopeList>('/scim/Scopes');
    return response.data;
  }

  createUser(userData: UserData, attributesToReturn?: string[]): Promise<UserResource> {
    return this._users.createResource(userData, attributesToReturn);
  }

  listUsers(params?: ResourceQueryParams<UserFilterParams>): Promise<ResourceList<UserResource>> {
    return this._users.getResourceList(params);
  }

  fetchUser(userId: string, attributesToReturn?: string[]): Promise<UserResource> {
    return this._users.getResource(userId, attributesToReturn);
  }

  updateUser(userId: string, userData: UserData, attributesToReturn?: string[]): Promise<UserResource> {
    return this._users.updateResource(userId, userData, attributesToReturn);
  }

  deleteUser(userId: string): Promise<void> {
    return this._users.deleteResource(userId);
  }

  createGroup(groupData: GroupData, attributesToReturn?: string[]): Promise<GroupResource> {
    return this._groups.createResource(groupData, attributesToReturn);
  }

  listGroups(params?: ResourceQueryParams<GroupFilterParams>): Promise<ResourceList<GroupResource>> {
    return this._groups.getResourceList(params);
  }

  fetchGroup(groupId: string, attributesToReturn?: string[]): Promise<GroupResource> {
    return this._groups.getResource(groupId, attributesToReturn);
  }

  updateGroup(groupId: string, groupData: GroupData, attributesToReturn?: string[]): Promise<GroupResource> {
    return this._groups.updateResource(groupId, groupData, attributesToReturn);
  }

  patchGroup(groupId: string, patchData: GroupPatchData): Promise<void>;
  patchGroup(groupId: string, patchData: GroupPatchData, attributesToReturn: string[]): Promise<GroupResource>;
  patchGroup(groupId: string, patchData: GroupPatchData, attributesToReturn?: string[]): Promise<any> {
    return this._groups.patchResource(groupId, patchData, attributesToReturn);
  }

  deleteGroup(groupId: string): Promise<void> {
    return this._groups.deleteResource(groupId);
  }

  listDevices(params?: ResourceQueryParams<DeviceFilterParams>): Promise<ResourceList<DeviceResource>> {
    return this._devices.getResourceList(params);
  }

  fetchDevice(deviceId: string, attributesToReturn?: string[]): Promise<DeviceResource> {
    return this._devices.getResource(deviceId, attributesToReturn);
  }

  updateDevice(deviceId: string, deviceData: DeviceData, attributesToReturn?: string[]): Promise<DeviceResource> {
    return this._devices.updateResource(deviceId, deviceData, attributesToReturn);
  }

  deleteDevice(deviceId: string): Promise<void> {
    return this._devices.deleteResource(deviceId);
  }

  createRole(roleData: RoleData): Promise<RoleResource> {
    return this._roles.createResource(roleData);
  }

  listRoles(params?: ResourceQueryParams<RoleFilterParams>): Promise<ResourceList<RoleResource>> {
    return this._roles.getResourceList(params);
  }

  fetchRole(roleId: string): Promise<RoleResource> {
    return this._roles.getResource(roleId);
  }

  updateRole(roleId: string, roleData: RoleUpdateData): Promise<RoleResource> {
    return this._roles.updateResource(roleId, roleData);
  }

  deleteRole(roleId: string): Promise<void> {
    return this._roles.deleteResource(roleId);
  }
}
