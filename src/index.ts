export { default as IonicApiClient, IonicApiClientParams } from './client/client';
import { default as createPolicy } from './policies/policy-builder';
import { Attributes } from './policies/xacml/attributes';
import * as fns from './policies/xacml/fns';

export const policies = {
  createPolicy,
  Attributes,
  fns,
};
