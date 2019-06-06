export interface DataPolicy {
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
  tenantId: string;
  status: string;
  enabled: boolean;
  policyId: string;
  description: string;
  ruleCombiningAlgId: string;
  target?: { condition: { functionId: string; args: { category: string; id: string }[] } };
  rules?: {
    ruleId: string;
    effect: string;
    description: string;
    condition?: { functionId: string; args: { category: string; id: string }[] };
  }[];
  policyVersion: number;
  requesterScopes: string[];
}
