export interface ResourceMeta {
  created: string;
  lastModified: string;
  location: string;
  version: string;
}

export interface Resource {
  schemas: string[];
  id: string;
  externalId: string;
  meta: ResourceMeta;
}

export interface ResourceList<T> {
  schemas: string[];
  totalResults: number;
  Resources: T[];
}

export interface UserResource {
  active?: boolean;
  emails?: { value: string; type: string; primary: boolean }[];
  groups?: { type: string; value: string; displayName: string }[];
  name?: { givenName: string; familyName: string; formatted: string };
  roles?: { type: string; value: string; display: string };
  userName?: string;
  [schema: string]: any;
}
