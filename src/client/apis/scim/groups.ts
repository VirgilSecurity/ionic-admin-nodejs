import { ResourceData, Resource } from './resources';
import { FilterParams } from '../../url-params-serializer';

export interface GroupData extends ResourceData {
  externalId?: string;
  displayName: string;
  members?: { value: string; type?: string }[];
  [schema: string]: any;
}

export interface GroupPatchData extends ResourceData {
  externalId?: string;
  displayName?: string;
  members?: { value: string; display?: string; operation?: 'delete' }[];
  meta?: { attributes: string[] };
}

export interface GroupFilterParams extends FilterParams {
  externalId?: string;
  description?: string;
  name?: string;
  createdTs?: number;
  updatedTs?: number;
}

export interface GroupResource extends Resource {
  externalId: string;
  displayName: string;
  members: { value: string; type?: string; display?: string }[];
  [schema: string]: any;
}
