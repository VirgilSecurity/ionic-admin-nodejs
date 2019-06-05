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

export interface GroupResource extends Resource {
  externalId: string;
  displayName: string;
  members: { value: string; type?: string; display?: string }[];
  [schema: string]: any;
}

export interface DeviceResource extends Resource {
  keySpace?: string;
  status?: boolean;
  name?: string;
  displayName?: string;
  deleted?: boolean;
  userId?: string;
  user?: UserResource;
  source?: { type: string; tenant: string; name: string; secondary: string };
  sourceOrig?: { type?: string; name?: string; secondary?: string; tenant?: string; deviceId?: string };
  subjectAttributes?: [{ type: string; value: string }];
  lastHeard?: string;
  lastIp?: string;
  os?: string;
  plugin?: string;
  application?: string;
  configRequestedTs?: string;
  appPolicyVersion?: number;
  configReference?: string;
  enrollmentAssertion?: {
    userId: string;
    enrollmentCfgId: string;
    enrollmentCfgVersion: number;
    keyspace: string;
    conversationId: string;
    userLookupField: string;
    userLookupValues: string[];
    userAttributes: { [key: string]: any };
    userAttributeSigB64: string;
  };
}

export interface RoleResource extends Resource {
  name?: string;
  displayName?: string;
  description?: string;
  scopes?: string[];
  active?: boolean;
  readOnly?: boolean;
}

export interface ResourceData {
  schemas: string[];
}

export interface ResourceQueryParams<TFilterParams> extends QueryParams<TFilterParams> {
  attributes?: string[];
}
