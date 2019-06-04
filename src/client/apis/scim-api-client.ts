import RequestExecutor from '../request-executor';
import { UserApiClient } from './scim/users';
import ResourceApiClient from './resource-api-client';
import { GroupApiClient } from './scim/groups';
import { RoleApiClient } from './scim/roles';
import { DeviceApiClient } from './scim/devices';
import { ScopeApiClient } from './scim/scopes';

const Schemas = {
  Core: 'urn:scim:schemas:core:1.0',
  Ionic: 'urn:scim:schemas:extension:ionic:1.0',
  Enterprise: 'urn:scim:schemas:extension:enterprise:1.0',
};

export class ScimApiClient {
  readonly users: UserApiClient;
  readonly groups: GroupApiClient;
  readonly roles: RoleApiClient;
  readonly devices: DeviceApiClient;
  readonly scopes: ScopeApiClient;

  get Schemas() {
    return Schemas;
  }

  constructor(requestExecutor: RequestExecutor) {
    this.users = new UserApiClient(new ResourceApiClient(requestExecutor, '/scim/Users'));
    this.groups = new GroupApiClient(new ResourceApiClient(requestExecutor, '/scim/Groups'));
    this.roles = new RoleApiClient(new ResourceApiClient(requestExecutor, '/scim/Roles'));
    this.devices = new DeviceApiClient(new ResourceApiClient(requestExecutor, '/scim/Devices'));
    this.scopes = new ScopeApiClient(requestExecutor, '/scim/Scopes');
  }
}
