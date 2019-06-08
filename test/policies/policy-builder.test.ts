import createPolicy from '../../src/policies/policy-builder';
import { Attributes } from '../../src/policies/xacml/attributes';
import { stringEqual } from '../../src/policies/xacml/fns';

test('can create policy', () => {
  const myPolicy = createPolicy({ policyId: 'MyPolicy', enabled: true, ruleCombiningAlgId: 'deny-overrides' })
    .appliesTo(stringEqual(Attributes.resource.classification, 'topsecret'))
    .allowIf(stringEqual(Attributes.subject.group, 'cia_agents'))
    .denyOtherwise()
    .toJson();

  expect(myPolicy).toEqual({
    policyId: 'MyPolicy',
    ruleCombiningAlgId: 'deny-overrides',
    enabled: true,
    target: {
      condition: {
        functionId: 'string-equal',
        args: [{ category: 'resource', id: 'classification' }, { dataType: 'string', value: ['topsecret'] }],
      },
    },
    rules: [
      {
        effect: 'Permit',
        description: '',
        condition: {
          functionId: 'string-equal',
          args: [{ category: 'subject', id: 'group' }, { dataType: 'string', value: ['cia_agents'] }],
        },
      },
      {
        effect: 'Deny',
        description: 'Deny otherwise.',
      },
    ],
  });
});
