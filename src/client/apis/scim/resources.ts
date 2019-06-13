import { QueryParams } from '../../url-params-serializer';

export interface ResourceMeta {
  created: string;
  lastModified: string;
  location: string;
  version: string;
  deleted?: boolean;
}

export interface Resource {
  schemas: string[];
  id: string;
  meta: ResourceMeta;
}

export interface ResourceList<T> {
  schemas: string[];
  totalResults: number;
  Resources: T[];
}

export interface ScopeList {
  scopes: { [scopeName: string]: string[] };
}

export interface ResourceData {
  schemas: string[];
}

export interface ResourceQueryParams<TFilterParams> extends QueryParams<TFilterParams> {
  attributes?: string[];
}
