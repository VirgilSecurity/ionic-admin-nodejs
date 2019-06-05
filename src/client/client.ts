import createAuthentication from './auth/create-authentication';
import { AuthOptions } from './auth/authentication';
import RequestExecutor from './request-executor';
import { ScimApiClient } from './apis/scim-api-client';
import { scimUrlParamsSerializer } from './apis/scim/scim-url-params-serializer';

export interface IonicApiClientParams {
  baseUrl: string;
  tenantId: string;
  auth: AuthOptions;
}

export default class IonicApiClient {
  readonly scim: ScimApiClient;

  constructor({ baseUrl, tenantId, auth }: IonicApiClientParams) {
    const requestExecutor = new RequestExecutor({
      baseUrl: baseUrl + '/v2/' + tenantId,
      authentication: createAuthentication(auth),
      paramsSerializer: scimUrlParamsSerializer,
    });
    this.scim = new ScimApiClient(requestExecutor);
  }
}
