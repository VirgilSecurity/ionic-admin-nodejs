import createPolicy from '../../src/policies/policy-builder';
import { Attributes } from '../../src/policies/xacml/attributes';
import {
  stringEqual,
  stringAtLeastOneMemberOf,
  integerGreaterThan,
  stringBagSize,
  dateTimeAddDayTimeDuration,
  dateTimeGreaterThanOrEqual,
} from '../../src/policies/xacml/fns';

test('create policy to ensure that data classified as top secret is only accessed by trusted guys', () => {
  const myPolicy = createPolicy({ policyId: 'MyPolicy', enabled: true, ruleCombiningAlgId: 'first-applicable' })
    .appliesTo(stringEqual(Attributes.resource.classification, 'topsecret'))
    .allowIf(stringEqual(Attributes.subject.groupName, 'trusted_guys'))
    .denyOtherwise()
    .toJson();

  expect(myPolicy).toEqual({
    policyId: 'MyPolicy',
    ruleCombiningAlgId: 'first-applicable',
    enabled: true,
    description: 'classification string-equal topsecret',
    target: {
      condition: {
        functionId: 'string-equal',
        args: [{ category: 'resource', id: 'classification' }, { dataType: 'string', value: 'topsecret' }],
      },
    },
    rules: [
      {
        effect: 'Permit',
        description: 'group-name string-equal trusted_guys',
        condition: {
          functionId: 'string-equal',
          args: [{ category: 'subject', id: 'group-name' }, { dataType: 'string', value: 'trusted_guys' }],
        },
      },
      {
        effect: 'Deny',
        description: 'Deny otherwise.',
      },
    ],
  });
});

test('create policy to ensure that data classified as sensitive or very sensitive is only accessed in country XYZ', () => {
  const myPolicy = createPolicy({ policyId: 'MyPolicy2', enabled: true, ruleCombiningAlgId: 'first-applicable' })
    .appliesTo(stringAtLeastOneMemberOf(Attributes.resource.classification, ['sensitive', 'very-sensitive']))
    .allowIf(stringEqual(Attributes.environment.locationCountry, 'XYZ'))
    .denyOtherwise()
    .toJson();

  expect(myPolicy).toEqual({
    policyId: 'MyPolicy2',
    ruleCombiningAlgId: 'first-applicable',
    enabled: true,
    description: 'classification string-at-least-one-member-of sensitive,very-sensitive',
    target: {
      condition: {
        functionId: 'string-at-least-one-member-of',
        args: [
          { category: 'resource', id: 'classification' },
          { dataType: 'string', value: ['sensitive', 'very-sensitive'] },
        ],
      },
    },
    rules: [
      {
        effect: 'Permit',
        description: 'location-country string-equal XYZ',
        condition: {
          functionId: 'string-equal',
          args: [{ category: 'environment', id: 'location-country' }, { dataType: 'string', value: 'XYZ' }],
        },
      },
      {
        effect: 'Deny',
        description: 'Deny otherwise.',
      },
    ],
  });
});

test('create policy to ensure that marked data is only accessed at least 3 days from data protection date', () => {
  const myPolicy = createPolicy({
    policyId: 'MyPolicy3',
    enabled: true,
    ruleCombiningAlgId: 'first-applicable',
  })
    .appliesTo(integerGreaterThan(stringBagSize(Attributes.resource.classification), 0))
    .allowIf(
      dateTimeGreaterThanOrEqual(
        Attributes.environment.currentDateTime,
        dateTimeAddDayTimeDuration(Attributes.resource.createdDateTime, 'P3D'),
      ),
    )
    .denyOtherwise()
    .toJson();

  expect(myPolicy).toEqual({
    policyId: 'MyPolicy3',
    ruleCombiningAlgId: 'first-applicable',
    enabled: true,
    description: 'string-bag-size classification integer-greater-than 0',
    target: {
      condition: {
        functionId: 'integer-greater-than',
        args: [
          {
            functionId: 'string-bag-size',
            args: [{ category: 'resource', id: 'classification' }],
          },
          { dataType: 'integer', value: 0 },
        ],
      },
    },
    rules: [
      {
        effect: 'Permit',
        description:
          'current-dateTime dateTime-greater-than-or-equal created-dateTime dateTime-add-dayTimeDuration P3D',
        condition: {
          functionId: 'dateTime-greater-than-or-equal',
          args: [
            { category: 'environment', id: 'current-dateTime' },
            {
              functionId: 'dateTime-add-dayTimeDuration',
              args: [{ category: 'resource', id: 'created-dateTime' }, { dataType: 'dayTimeDuration', value: 'P3D' }],
            },
          ],
        },
      },
      {
        effect: 'Deny',
        description: 'Deny otherwise.',
      },
    ],
  });
});
