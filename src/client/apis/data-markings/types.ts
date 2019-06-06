import { QueryParams, FilterParams } from '../../url-params-serializer';

export interface DataMarking {
  id: string;
  _createdTs: number;
  _createdBy: string;
  _updatedTs: number;
  _updatedBy: string;
  _version: number;
  name: string;
  adminOnly: boolean;
  public: boolean;
  defaultValue: string;
  detail: {
    description: string;
    dataType: string;
    default: boolean;
    defaultVersion: number;
    valueCount: number;
    policies: { referenced: number };
    values: {
      id: string;
      _createdTs: number;
      _createdBy: string;
      _updatedTs: number;
      _updatedBy: string;
      _version: number;
      changedBy: { tenantId: string; id: string; apiKey: { id: string; name: string; exists: string } };
      markingId: string;
      name: string;
      description: string;
      policies: { referenced: number; relevant: number };
    }[];
  };
  changedBy: {
    tenantId: string;
    id: string;
    name: { givenName: string; familyName: string; formatted: string };
    email: string;
    userName: string;
    display: string;
    exists: 'exists' | 'unknown';
  };
}

export interface DataMarkingValue {
  id: string;
  _createdTs: number;
  _createdBy: string;
  _updatedTs: number;
  _updatedBy: string;
  _version: number;
  changedBy: {
    tenantId: string;
    id: string;
    name: { givenName: string; familyName: string; formatted: string };
    email: string;
    userName: string;
    display: string;
    exists: string;
    apiKey: { id: string; name: string; exists: string };
  };
  markingId: string;
  name: string;
  description: string;
  policies: { referenced: number; relevant: number };
}

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
