import RequestExecutor from '../../request-executor';

export interface ScopeList {
  scopes: { [scopeName: string]: string[] };
}

export class ScopeApiClient {
  private readonly _requestExecutor: RequestExecutor;
  private readonly _prefix: string;

  constructor(requestExecutor: RequestExecutor, prefix: string) {
    this._requestExecutor = requestExecutor;
    this._prefix = prefix;
  }

  async listScopes(): Promise<ScopeList> {
    const response = await this._requestExecutor.get<ScopeList>(this._prefix);
    return response.data;
  }
}
