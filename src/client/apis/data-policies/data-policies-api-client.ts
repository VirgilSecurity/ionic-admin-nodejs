import RequestExecutor from '../../request-executor';
import { DataPolicy } from './types';
import { FilterParams, QueryParams } from '../../url-params-serializer';

export interface DataPolicyList {
  totalResults: number;
  skip: number;
  limit: number;
  _version: number;
  Resources: DataPolicy[];
}

export interface DataPolicyData {
  policyId: string;
  description: string;
  ruleCombiningAlgId?: 'deny-overrides' | 'first-applicable';
  enabled?: boolean;
  target?: {};
  rules?: { ruleId?: string; effect: 'Permit' | 'Deny'; description: string; condition?: {} }[];
}

export type DataPolicyUpdateData = Partial<DataPolicyData>;
export type DataPolicyUpdateDataWithId = DataPolicyUpdateData & { id: string };

export interface DataPolicyFilterParams extends FilterParams {
  enabled?: boolean;
  group?: string;
  marking?: string;
  policyid?: string;
  summary?: string;
  user?: string;
}

const POLICIES_ENDPOINT = '/policies';
const SINGLE_POLICY_ENDPOINT = (id: string) => `${POLICIES_ENDPOINT}/${id}`;

export class DataPolicyApiClient {
  private readonly _requestExecutor: RequestExecutor;

  constructor(requestExecutor: RequestExecutor) {
    this._requestExecutor = requestExecutor;
  }

  async createPolicy(data: DataPolicyData): Promise<DataPolicy> {
    const response = await this._requestExecutor.post<DataPolicy>(POLICIES_ENDPOINT, data);
    return response.data;
  }

  async fetchPolicy(id: string): Promise<DataPolicy> {
    const response = await this._requestExecutor.get<DataPolicy>(SINGLE_POLICY_ENDPOINT(id));
    return response.data;
  }

  async listPolicies(params?: QueryParams<DataPolicyFilterParams>): Promise<DataPolicyList> {
    const response = await this._requestExecutor.get<DataPolicyList>(POLICIES_ENDPOINT, { params });
    return response.data;
  }

  async updatePolicy(id: string, data: DataPolicyUpdateData): Promise<DataPolicy> {
    const response = await this._requestExecutor.put<DataPolicy>(SINGLE_POLICY_ENDPOINT(id), data);
    return response.data;
  }

  async createOrUpdatePolicies(
    data: (DataPolicyData | DataPolicyUpdateDataWithId)[],
    { merge }: { merge?: 'false' | 'true' | 'replace' } = {},
  ): Promise<DataPolicy[]> {
    const config = typeof merge === 'string' ? { params: { merge } } : undefined;
    const response = await this._requestExecutor.post<DataPolicy[]>(POLICIES_ENDPOINT, data, config);
    return response.data;
  }

  async deletePolicy(id: string): Promise<void> {
    await this._requestExecutor.delete(SINGLE_POLICY_ENDPOINT(id));
  }
}
