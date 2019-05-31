import ApiClient from './api-client';
import RequestExecutor from '../request-executor';
import UserApiClient from './scim/users';

const Schemas = {
  Core: 'urn:scim:schemas:core:1.0',
  Ionic: 'urn:scim:schemas:extension:ionic:1.0',
  Enterprise: 'urn:scim:schemas:extension:enterprise:1.0',
};

export class ScimApiClient extends ApiClient {
  readonly users: UserApiClient;

  get Schemas() {
    return Schemas;
  }

  constructor(requestExecutor: RequestExecutor) {
    super(requestExecutor, '/scim');
    this.users = new UserApiClient(requestExecutor, this.prefix + '/Users');
  }
}
