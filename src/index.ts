export { default as Client } from './client/client';
export { default as buildSamlResponse } from './saml/build-response';
import { default as createPolicy } from './policies/policy-builder';
import { Attributes } from './policies/xacml/attributes';
import * as fns from './policies/xacml/fns';

export const policies = {
  createPolicy,
  Attributes,
  fns,
};
