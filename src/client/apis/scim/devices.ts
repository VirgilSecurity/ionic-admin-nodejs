import { ResourceData, Resource } from './resources';
import { FilterParams } from '../../url-params-serializer';
import { UserResource } from './users';

export interface DeviceData extends ResourceData {
  name?: string;
  status?: boolean;
  subjectAttributes?: { type: string; value: string }[];
}

export interface DeviceFilterParams extends FilterParams {
  name?: string;
  status?: boolean;
  userId?: string;
  createdTs?: number;
  updatedTs?: number;
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
