import createAuthentication from './auth/create-authentication';
import { AuthOptions } from './auth/authentication';
import RequestExecutor from './request-executor';
import { ScimApiClient } from './apis/scim/scim-api-client';
import { scimUrlParamsSerializer } from './apis/scim/scim-url-params-serializer';
import { DataMarkingApiClient } from './apis/data-markings/data-markings-api-client';
import { urlParamsSerializer } from './url-params-serializer';
import { DataPolicyApiClient } from './apis/data-policies/data-policies-api-client';

export interface IonicApiClientParams {
  baseUrl: string;
  tenantId: string;
  auth: AuthOptions;
}

export default class IonicApiClient {
  readonly scim: ScimApiClient;
  readonly dataMarkings: DataMarkingApiClient;
  readonly dataPolicies: DataPolicyApiClient;

  constructor({ baseUrl, tenantId, auth }: IonicApiClientParams) {
    const tenantBaseUrl = baseUrl + '/v2/' + tenantId;
    const authentication = createAuthentication(auth);

    this.scim = new ScimApiClient(
      new RequestExecutor({
        authentication,
        baseUrl: tenantBaseUrl,
        paramsSerializer: scimUrlParamsSerializer,
      }),
    );

    this.dataMarkings = new DataMarkingApiClient(
      new RequestExecutor({
        authentication,
        baseUrl: tenantBaseUrl,
        paramsSerializer: urlParamsSerializer,
      }),
    );

    this.dataPolicies = new DataPolicyApiClient(
      new RequestExecutor({
        authentication,
        baseUrl: tenantBaseUrl,
        paramsSerializer: urlParamsSerializer,
      }),
    );
  }
}
