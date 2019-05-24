import createAuthentication from './auth/create-authentication';
import { AuthOptions } from './auth/authentication';
import RequestExecutor from './request-executor';

export interface IonicApiClientParams {
  baseUrl: string;
  tenantId: string;
  auth: AuthOptions;
}

export default class IonicApiClient {
  private _requestExecutor: RequestExecutor;

  constructor({ baseUrl, tenantId, auth }: IonicApiClientParams) {
    this._requestExecutor = new RequestExecutor(baseUrl, createAuthentication(auth));
  }
}
