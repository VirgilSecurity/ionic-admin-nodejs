import RequestExecutor from '../../request-executor';
import { DataMarking, DataMarkingValue } from './types';
import { QueryParams, FilterParams } from '../../url-params-serializer';

interface ListResponse {
  totalResults: number;
  skip: number;
  limit: number;
}

export interface DataMarkingList extends ListResponse {
  Resources: DataMarking[];
}

export interface DataMarkingValueList extends ListResponse {
  Resources: DataMarkingValue[];
}

export interface DataMarkingFilterParams extends FilterParams {
  description?: string;
  name?: string;
  public?: boolean;
}

export interface DataMarkingValueFilterParams extends FilterParams {
  description?: string;
  name?: string;
}

export interface DataMarkingQueryParams extends QueryParams<DataMarkingFilterParams> {
  valueLimit?: number;
}

export interface DataMarkingData {
  name: string;
  public?: boolean;
  adminOnly?: boolean;
  defaultValue?: string;
  detail?: {
    description?: string;
    valueCount?: number;
    values?: { name: string; description?: string };
  };
}

export interface DataMarkingValueData {
  name: string;
  description?: string;
}

export type DataMarkingUpdateData = Partial<DataMarkingData>;
export type DataMarkingUpdateDataWithId = DataMarkingUpdateData & { id: string };
export type DataMarkingValueUpdateData = Partial<DataMarkingValueData>;

const MARKIGNS_ENDPOINT = '/markings';
const SINGLE_MARKING_ENDPOINT = (markingId: string) => `${MARKIGNS_ENDPOINT}/${markingId}`;
const MARKING_VALUES_ENDPOINT = (markingId: string) => `${SINGLE_MARKING_ENDPOINT(markingId)}/values`;
const SINGLE_MARKING_VALUE_ENDPOINT = (markingId: string, valueId: string) =>
  `${MARKING_VALUES_ENDPOINT(markingId)}/${valueId}`;

export class DataMarkingApiClient {
  private readonly _requestExecutor: RequestExecutor;

  constructor(requestExecutor: RequestExecutor) {
    this._requestExecutor = requestExecutor;
  }

  async createMarking(dataMarkingData: DataMarkingData): Promise<DataMarking> {
    const response = await this._requestExecutor.post<DataMarking>(MARKIGNS_ENDPOINT, dataMarkingData);
    return response.data;
  }

  async listMarkings(params?: DataMarkingQueryParams): Promise<DataMarkingList> {
    const response = await this._requestExecutor.get<DataMarkingList>(MARKIGNS_ENDPOINT, {
      params: params,
    });
    return response.data;
  }

  async fetchMarking(id: string, { valueLimit }: { valueLimit?: number } = {}): Promise<DataMarking> {
    const response = await this._requestExecutor.get<DataMarking>(SINGLE_MARKING_ENDPOINT(id), {
      params: typeof valueLimit === 'number' ? { valueLimit } : undefined,
    });
    return response.data;
  }

  async updateMarking(id: string, dataMarkingData: Partial<DataMarkingData>): Promise<DataMarking> {
    const response = await this._requestExecutor.put<DataMarking>(SINGLE_MARKING_ENDPOINT(id), dataMarkingData);
    return response.data;
  }

  async createOrUpdateMarkings(data: (DataMarkingData | DataMarkingUpdateDataWithId)[]): Promise<DataMarking[]> {
    const response = await this._requestExecutor.post<DataMarking[]>(MARKIGNS_ENDPOINT, data);
    return response.data;
  }

  async deleteMarking(markingId: string): Promise<void> {
    await this._requestExecutor.delete(SINGLE_MARKING_ENDPOINT(markingId));
  }

  async listValues(
    markingId: string,
    params?: QueryParams<DataMarkingValueFilterParams>,
  ): Promise<DataMarkingValueList> {
    const response = await this._requestExecutor.get<DataMarkingValueList>(MARKING_VALUES_ENDPOINT(markingId), {
      params,
    });
    return response.data;
  }

  async fetchValue(markingId: string, valueId: string): Promise<DataMarkingValue> {
    const response = await this._requestExecutor.get<DataMarkingValue>(
      SINGLE_MARKING_VALUE_ENDPOINT(markingId, valueId),
    );
    return response.data;
  }

  async createValue(markingId: string, data: DataMarkingValueData): Promise<DataMarkingValue> {
    const response = await this._requestExecutor.post<DataMarkingValue>(MARKING_VALUES_ENDPOINT(markingId), data);
    return response.data;
  }

  async updateValue(markingId: string, valueId: string, data: DataMarkingValueUpdateData): Promise<DataMarkingValue> {
    const response = await this._requestExecutor.put<DataMarkingValue>(
      SINGLE_MARKING_VALUE_ENDPOINT(markingId, valueId),
      data,
    );
    return response.data;
  }

  async deleteValue(markingId: string, valueId: string): Promise<void> {
    await this._requestExecutor.delete(SINGLE_MARKING_VALUE_ENDPOINT(markingId, valueId));
  }
}
