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
      changedBy: { tenantId: string; id: string; apiKey?: { id: string; name: string; exists: string } };
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
    apiKey?: { id: string; name: string; exists: string };
  };
  markingId: string;
  name: string;
  description: string;
  policies: { referenced: number; relevant: number };
}
