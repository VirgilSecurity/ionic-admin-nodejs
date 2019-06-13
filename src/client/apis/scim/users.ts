import { ResourceData, Resource } from './resources';
import { FilterParams } from '../../url-params-serializer';

export interface UserData extends ResourceData {
  name: { givenName?: string; familyName?: string; formatted?: string };
  externalId?: string;
  emails?: { value: string; type?: string; primary?: boolean }[];
  roles?: { value: string }[];
  userName?: string;
  [schema: string]: any;
}

export interface UserFilterParams extends FilterParams {
  domainUpn?: string;
  email?: string | string[];
  enabled?: boolean;
  externalId?: string;
  groups?: string | string[];
  roles?: string | string[];
  createdTs?: number;
  updatedTs?: number;
}

export interface UserResource extends Resource {
  externalId: string;
  active?: boolean;
  emails?: { value: string; type: string; primary: boolean }[];
  groups?: { type: string; value: string; displayName: string }[];
  name?: { givenName: string; familyName: string; formatted: string };
  roles?: { type: string; value: string; display: string };
  userName?: string;
  [schema: string]: any;
}
