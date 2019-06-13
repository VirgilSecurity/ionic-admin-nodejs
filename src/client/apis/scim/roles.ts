import { ResourceData, Resource } from './resources';
import { FilterParams } from '../../url-params-serializer';

export interface RoleFilterParams extends FilterParams {
  name?: string;
  createdTs?: number;
  updatedTs?: number;
}

export interface RoleData extends ResourceData {
  name: string;
  displayName?: string;
  description?: string;
  scopes?: string[];
}

export interface RoleUpdateData extends ResourceData {
  name?: string;
  displayName?: string;
  description?: string;
  scopes?: string[];
}

export interface RoleResource extends Resource {
  name?: string;
  displayName?: string;
  description?: string;
  scopes?: string[];
  active?: boolean;
  readOnly?: boolean;
}
