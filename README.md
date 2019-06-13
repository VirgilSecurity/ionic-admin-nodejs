# Ionic Admin SDK for Node.js

* [Introduction](#introduction)
* [Installation](#installation)
* [Usage](#usage)
* [To Do](#to-do)

## Introduction

The Ionic Platform allows developers to add high-value security to their application. With no background in cryptography, you can quickly and confidently add data protection and management to your application.

The Ionic Admin SDK enables developers to manage users, groups, data markings and data access policies in their tenant. Currently supports [SCIM](https://dev.ionic.com/api/scim), [Markings](https://dev.ionic.com/api/markings) and [Policies](https://dev.ionic.com/api/policies) APIs.

## Installation

This library hasn't been published on npm yet and needs to be installed from GitHub:

```sh
npm i https://github.com/VirgilSecurity/ionic-admin-nodejs/releases/download/v0.1.0/ionic-admin-sdk-0.1.0.tgz
```

## Usage

### Management APIs

All of the APIs are available from the instance of the `IonicApiClient` class, which must be instantiated with your Ionic API base URL, your Tenant ID and authentication options:

```javascript
const { IonicApiClient } = require('ionic-admin-sdk');

const client = new IonicApiClient({
  baseUrl: 'https://api.ionic.com',
  tenantId: '<YOUR_TENANT_ID>',
  auth: { }, // see "Authentication" section below
});
```

#### Authentication

Ionic Management API requires [authentication](https://dev.ionic.com/api/usage/authentication). In order to use API authentication, an Ionic Administrator account must be created. This account must have access to the API, via the scope `access:api`. Further authorization is required for each operation. For example, if making a request to create a new policy, the user must be assigned to a role that grants permission to create new policies, via the scope `policies:create`.

There are three supported authentication schemes:

* Bearer or OAuth 2.0 Authentication 
* MAC Authentication
* Basic Authentication

In order to use **Bearer authentication**, an administrator must first create an API Key. Once created, a "Secret Token" is provided and should be copied and stored securely. The "Secret Token" must be securely provided (i.e. via environment variable) as `auth.secretToken` option to the `IonicApiClient` constructor along with `auth.type` option equal to `'bearer'`:

```javascript
const { IonicApiClient } = require('ionic-admin-sdk');

const client = new IonicApiClient({
  baseUrl: 'https://api.ionic.com',
  tenantId: '<YOUR_TENANT_ID>',
  auth: {
    type: 'bearer',
    secretToken: process.env.IONIC_API_SECRET_TOKEN,
  },
});
```

For **MAC authentication**, an API Key must be created. Once created, an "ID" and "Secret" are provided and should be copied and stored securely. These are provided as `auth.apiKeyId` and `auth.apiKeySecret` options to the `IonicApiClient` constructor along with `auth.type` option equal to `'mac'`:

```javascript
const { IonicApiClient } = require('ionic-admin-sdk');

const client = new IonicApiClient({
  baseUrl: 'https://api.ionic.com',
  tenantId: '<YOUR_TENANT_ID>',
  auth: {
    type: 'mac',
    apiKeyId: process.env.IONIC_API_KEY_ID,
    apiKeySecret: process.env.IONIC_API_KEY_SECRET,
  },
});
```

To use **basic authentication**, you must create an API Access Account. You can create an API Access Account in the Ionic Administrator Console. This is done by creating a user with the "API Administrator" role. The username and password must be provided as `auth.username` and `auth.password` options to the `IonicApiClient` constructor along with `auth.type` option equal to `'basic'`:

```javascript
const { IonicApiClient } = require('ionic-admin-sdk');

const client = new IonicApiClient({
  baseUrl: 'https://api.ionic.com',
  tenantId: '<YOUR_TENANT_ID>',
  auth: {
    type: 'basic',
    username: process.env.IONIC_USERNAME,
    password: process.env.IONIC_PASSWORD,
  },
});
```

#### SCIM API

The SCIM API enables users to programmatically manage users registered in the Ionic Platform. These are available via `scim` property of the `IonicApiClient` instance. 

All of the [API endpoints](https://dev.ionic.com/api/scim), except the [Bulk Operations](https://dev.ionic.com/api/scim/bulk-operations) are supported.
Each supported endpoint corresponds to a method, e.g. `scim.listScopes`, with the method name being the endpoint name in camelCase. One exception to that are "Update Group PUT" and "Update Group PATCH" endpoints, which correspond to `scim.updateGroup` and `scim.patchGroup` methods respectively.

All of the methods accept and return JSON in the same format as the API endpoints. Methods corresponding to endpoints with the resource ID in the URL (e.g. Fetch User), accept the ID as the first parameter.

If an endpoint accepts query parameters, the corresponding method accepts an object with property names corresponding to query parameter names as the last argument:

```javascript
const user = await client.scim.fetchUser(userId, { attributes: ['name', 'email', 'groups' ] });
```

##### Examples

**Create User**

```javascript
const user = await client.scim.createUser({
  schemas: [client.scim.Schemas.Core, client.scim.Schemas.Ionic], 
  name: { givenName: 'John', familyName: 'Doe' },
  email: [{ value: 'jdoe@example.com' }],
  [client.scim.Schemas.Ionic]: {
    domainUpn: 'jdoe@example.com',
    sendEmail: false,
    groups: [{ type: 'group', value: groupId }]
  }
});
console.log(user.id); // e.g. 5890d3baf8ab7b0291acd1fc
```

**List Users**

```javascript
const params = { skip: 1, limit: 10, filter: { email: 'user@example.com' } };
const result = await client.scim.listUsers(params);
console.log(result.Resources.length); // <= 10
```

**Fetch User**

```javascript
const user = await client.scim.fetchUser(userId);
```

**Update User**

```javascript
const updateData = { schemas: [client.scim.Schemas.Core], name: { familyName: 'Anderson' } };
const updatedUser = await client.scim.updateUser(userId, updateData);
```

**Delete User**

```javascript
await client.scim.deleteUser(userId);
```

**Update Device**

```javascript
const disabledDevice = await client.scim.updateDevice(deviceId, {
  schemas: [client.scim.Schemas.Core],
  status: false
});
console.log(disableDevice.status); // false
```

**List Groups**

```javascript
const groupList = await client.scim.listGroups();
console.log(groupList.totalResults); // e.g. 5
```

**Update Group PATCH**

```javascript
const patchData: GroupPatchData = {
  schemas: [client.scim.Schemas.Core, client.scim.Schemas.Ionic],
  members: [
    {
      value: '777777777777777777',
      operation: 'delete',
    },
    {
      value: '888888888888888888',
    },
  ],
  displayName: 'NewDisplayName',
};

// when "attributes" query parameter is not specified - the method returns undefined
await scim.patchGroup(groupId, patchData);
// or
// when "attributes" is specified = the method returns the updated group
const updatedGroup = client.scim.patchGroup(groupId, patchData, { attributes: ['displayName', 'members'] });
console.log(updatedGroup.id);
```

**Delete Role**

```javascript
await client.scim.deleteRole(roleId);
```

#### Data Markings API

Data Markings allow developers to associate attributes to the keys that protect application data. These attributes can be used for both data access policy purposes and for analytics purposes. This API is avalable via `dataMarkings` property of the `IonicApiClient` instance.

All of the [API endpoints](https://dev.ionic.com/api/markings) are supported. Each endpoint corresponds to a method on the `client.dataMarkings` object, e.g. `client.dataMarkings.listMarkings`, with the method name being the endpoint name in camelCase.

All of the methods accept and return JSON in the same format as the API endpoints. Methods corresponding to endpoints with the resource ID in the URL (e.g. Fetch Data Marking), accept the ID as the first parameter.

If an endpoint accepts query parameters, the corresponding method accepts an object with property names corresponding to query parameter names as the last argument:

```javascript
const marking = await client.dataMarkings.fetchMarking(markingId, { valueLimit: 10 });
console.log(marking.detail.values.length); // <= 10
```

##### Examples

**Create Data Marking**

```javascript
const dataMarking = await client.dataMarkings.createMarking({ name: 'custom-marking' });
console.log(dataMarking.id); // e.g. 533333333333333333333333
```

**List Data Markings**

```javascript
const dataMarkingList = await client.dataMarkings.listMarkings({ valueLimit: 10 });
console.log(dataMarkingList.totalResults); // e.g. 10
```

**Fetch Data Marking**

```javascript
const dataMarkingById = await client.dataMarkings.fetchMarking(markingId);
// or with "valueLimit" query parameter
// const dataMarkingById = await client.dataMarkings.fetchMarking(markingId, { valueLimit: 10 });
```

**Create or Update Multiple Markings**

```javascript
const data = [{ name: 'CreatedName' }, { id: markingToUpdate.id, name: 'UpdatedName' }];
const result = await markings.createOrUpdateMarkings(data);
console.log(result.length); // 2
```

**Create Marking Value**

```javascript
const markingValue = await client.dataMarkings.createValue(markingId, { name: 'custom-value' });
console.log(markingValue.id); // e.g. 555555555555555555555555
```

**List Marking Values**

```javascript
const markingValueList = await client.dataMarkings.listValues(markingId);
console.log(markingValueList.totalResults); // e.g. 100
```

#### Data Policies API

Data policies allow developers to create rules for how data can be accessed. The Policies API is used to administer policies for a tenant and is available via `dataPolicies` property of the `IonicApiClient` instance. Administrators can perform list, fetch, create, update, and delete actions on policies using these API methods.

All of the [API endpoints](https://dev.ionic.com/api/policies) are supported. Each endpoint corresponds to a method on the `client.dataPolicies` object, e.g. `client.dataPolicies.listPolicies`, with the method name being the endpoint name in camelCase. One exception to that is "Create or Update Multiple Policies" endpoint which corresponds to `client.dataPolicies.createOrUpdatePolicies` method.

All of the methods accept and return JSON in the same format as the API endpoints. Methods corresponding to endpoints with the resource ID in the URL (e.g. Fetch Policy), accept the ID as the first parameter.

If an endpoint accepts query parameters, the corresponding method accepts an object with property names corresponding to query parameter names as the last argument:

```javascript
const policies = await client.dataPolicies.createOrUpdatePolicies(data, { merge: 'true' });
```

##### Examples

**Create Policy**

```javascript
const policy = await client.dataPolicies.createPolicy({ policyId: 'MyPolicy', description: 'All data' });
console.log(policy.id); // e.g. 66666666666666666666666
```

**Fetch Policy**
```javascript
const policyById = await client.dataPolicies.fetchPolicy(policy.id);
console.log(polucyById.description); // All data
```

**Update Policy**
```javascript
const updatedPolicy = await client.dataPolicies.updatePolicy(policy.id, { policyId: 'NewName' });
console.log(updatedPolicy.policyId); // NewName
```

**Create or Update Multiple Policies**
```javascript
const data = [
  { id: policy.id, policyId: 'UpdatedPolicyName' },
  { policyId: 'NewPolicyName', description: 'All data' },
];

const result = await client.dataPolicies.createOrUpdatePolicies(data);
// or with the "merge" query parameter set to "true"
// const result = await client.dataPolicies.createOrUpdatePolicies(data, { merge: 'true' });
console.log(result.length); // 2
```

**List Policies**
```javascript
const policyList = await client.dataPolicies.listPolicies();
console.log(policyList.totalResults); // e.g. 8
```

#### Pagination, Search and Filter Paremeters

To all of the `list*` methods (except for `scim.listScopes`) parameters may be provided to control the number of results and apply some filtering criteria to the returned list.

**Pagination**

The following parameters may be used for pagination: `startIndex` and `count` or `skip` and `limit`. The `limit` and `count` parameters may be used interchangeable. The `skip` and `startIndex` parameters have an off-by-one relationship defined by `startIndex=skip+1`.

```javascript
const userList = await client.scim.listUsers({ startIndex: 11, count: 10 });
console.log(userList.Resources); // array of Users

const dataPolicyList = await client.dataPolicies.listPolicies({ skip: 10, limit: 10 });
console.log(dataPolicyList.Resources); // array of Data Markings
```

**Output control**
In SCIM API methods `attributes` parameter can be used to specify the fields to include in the response:

```javascript
const groupList = await client.scim.listGroups({ startIndex: 11, count: 10, attributes: ['name', 'members'] });
console.log(groupList.Resources); // array of Groups
```

The Data Markings API `listMarkings` method accept a `valueLimit` parameter to limit the number of values to include with each marking:

```javascript
const dataMarkingList = await client.dataMarkings.listMarkings({ skip: 0, limit: 10, valueLimit: 5 });
console.log(dataMarkingList.Resources); // array of Markings
```

**Search and Filter**

Filter parameters may be passed into `list*` methods as the `filter` option. The list of attributes supported depends on the Endpoint being called and corresponds to the list defined in the appropriate endpoint documentation (e.g. [List Users](https://dev.ionic.com/api/scim/list-users)). 

To control the way the value is matched, one or more filter operators may be scpecified. As opposed to the API, where the filter operators are appended to the field name, here they must be passed as an object with properties matching the names of suffixes defined in the API documentation:

```javascript
const userList = await client.scim.listUsers({
  filter: {
    email: 'username@example.com', // no operator, the field will be matched exactly
    domainUpn: { __contains: 'something' }, 
    externalId: { __startswith: 'I.E.' },
    groups: { __any: ['some_group_id'] },
    roles: { __empty: true },
    createdTs: { __gte: (Date.now() / 1000) - 600  }, // created in the last 10 minutes
  }
});
```

> Note: When more than one named parameter is used, they will be combined using an intersection ("and") query strategy.

When multiple filter parameters are provided and `or: true`, results will include a union of records matching each parameter provided:

```javascript
const groupList = await client.scim.listGroups({
  filter: {
    name: { __startswith: 'My' },
    description: { __empty: false },
    or: true
  }
});
```

The `__ne` filter operator may be used to return records that have an associated field value that does not match the provided value:

```javascript
const groupList = await client.scim.listGroups({
  filter: {
    name: { __ne: 'MyGroup' },
  }
});
```

This may also be combined with other operators to negate them:

```javascript
const groupList = await client.scim.listGroups({
  filter: {
    name: { __contains: { __ne: 'Group' } },
  }
});
```

Multiple operators for the same field may be specified:

```javascript
const groupList = await client.scim.listGroups({
  filter: {
    createdTs: { __lte: (Date.now() / 1000) - 600, __gte: (Date.now() / 1000) - 300 },
  }
});
```

#### Error Handling

When the server returns a response with the status code that falls out of range of 2xx, the Promise returned from the API method is rejected with an error object with the following structure:

```javascript
{
  name: 'IonicApiError',
  message: 'Request failed with status code 400', // message explaining what went wrong in general terms
  httpStatus: 400, // HTTP Status Code returned by the server
  data: // Optional details about the error returned by the server 
  { 
    status: 400,
    detail: { message: ['The schema is missing'] }, // array of messages describing the actual problem
    source:
    {
      method: 'POST',
      url: '/1234567890/scim/Users',
      cid: '94860bab-7355-48d6-53bc-cf2e3ef412b1'
    },
    code: 30001,
    error: 'SCHEMA_MISSING'
  }
}
```

### Constructing Policy

For cunstructing policies there is a helper function called `createPolicy` available under the `policies` namespace of the library. It accepts a hash with three properties - _policyId_, _enabled_ and _ruleCombiningAlgId_ and returns a `PolicyBuilder` object with a fluent interface that allows for further configuration of the policy - setting the Target and Rules. As in the [API](https://dev.ionic.com/api/policies/create-policy) _policyId_ is the only required field. The _description_ field will depend on the Target and will be generated automatically.

```javascript
const { policies } = require('ionic-admin-sdk');

const policyBuilder = policies.createPolicy({ 
  policyId: 'MyPolicy',
  ruleCombiningAlgId: 'first-applicable'
});
```

To set the Target for the policy, two methods of the `PolicyBuilder` can be used interchangeably - `appliesToAllData`, which makes a policy that applies to all requests, and `appliesTo` which allows to specify a condition under which the policy is applied. Both of these methods return the same instance of `PolicyBuilder` you can chaing further method calls to:

> Condition syntax will be explored below:

```javascript
const policyBuilder = policies.createPolicy({ policyId: 'MyPolicy' }).appliesToAllData();
// or 
const policyBuilder2 = policies.createPolicy({ policyId: 'MyPolicy' }).appliesTo({...});
```

After the Target is set, you can specify the Rules for the policy. There are four methods on the `PolicyBuilder` to help with that:

* `alwaysAllow()` - Adds a rule with "Permit" effect, "Always allow." as description and no condition
* `alwaysDeny()` - Adds a rule with "Deny" effect, "Always deny." as description and no condition
* `allowIf(condition)` - Adds a rule with "Permit" effect, description computed from `condition` and the condition itself
* `denyIf(condition)` - Adds a rule with "Deny" effect, description computed from `condition` and the condition itself
* `allowOtherwise()` - Adds a rule with "Permit" effect, "Allow otherwise." as description and no condition
* `denyOtherwise()` - Adds a rule with "Deny" effect, "Deny otherwise." as description and no condition

> You can see that the first two methods are semantically equvalent to the last two methods. They exist because they make for more readable code and rule descriptions

These methods also return the `PolicyBuilder` instance:

```javascript
const policyBuilder = policies.createPolicy({ policyId: 'MyPolicy' })
  .appliesToAllData()
  .allwaysAllow();

const policyBuilder2 = policies.createPolicy({ policyId: 'MyPolicy', ruleCombiningAlgId: 'first-applicable' })
  .appliesToAllData()
  .allowIf({...}) // condition syntax is explained below
  .denyOtherwise();
```

Finally, when the Target and the Rules have been configured, the `PolicyBuilder`'s `toJson` method can be used to get an object representation of the policy, that can be passed into the API method to create the Policy resource on the server:

```javascript
const policyData = policies.createPolicy({ policyId: 'MyPolicy' })
  .appliesToAllData()
  .alwaysAllow()
  .toJson();

const policy = await client.dataPolicies.createPolicy(policyData);
```

**Condition construction**

The construction of simple or complex conditions using the functions provided by the Ionic Policy Engine applied against the attributes available in a decision request is what makes XACML and the Ionic Policy Engine flexible and powerful.

All Functions (except for the Higher Order Bag functions) and all Key Request Attributes listed in the [Ionic XACML Reference](https://dev.ionic.com/platform/policy/xacml-reference) are available under the `policies` namespace of the libary. 

Attributes are arranged as objects hierarchy with the root `Attributes` object which has properties for each _Category_ (i.e. `resource`, `subject` and `environment`) which in turn have properties for every _ID_ in the category with the property name equal to `camelCase(ID)`:

```javascript
console.log(policies.Attributes.resource.createdDateTime); // { "category": "resource", id: "created-dateTime" }
```

The XACML Functions are represented as regular functions under the `fns` namespace with names in camelCase:

```javascript
console.log(typeof policies.fns.stingEqual); // function
console.log(typeof policies.fns.stringAtLeastOneMemberOf); // function
console.log(typeof policies.fns.or); // function
```

The `condition` parameter passed into `appliesTo`, `allowIf` or `denyIf` methods must be a function with the return type of `boolean`:

```javascript
// create policy to ensure that data classified as top secret is only accessed by trusted guys
const myPolicy = createPolicy({ policyId: 'MyPolicy', ruleCombiningAlgId: 'first-applicable' })
  .appliesTo(stringEqual(Attributes.resource.classification, 'topsecret'))
  .allowIf(stringEqual(Attributes.subject.groupName, 'trusted_guys'))
  .denyOtherwise()
  .toJson();

// create policy to ensure that data classified as sensitive or very sensitive is only accessed in country XYZ
const myPolicy2 = createPolicy({ policyId: 'MyPolicy2', ruleCombiningAlgId: 'first-applicable' })
  .appliesTo(stringAtLeastOneMemberOf(Attributes.resource.classification, ['sensitive', 'very-sensitive']))
  .allowIf(stringEqual(Attributes.environment.locationCountry, 'XYZ'))
  .denyOtherwise()
  .toJson();

// create policy to ensure that marked data is only accessed at least 3 days from data protection date
const myPolicy = createPolicy({ policyId: 'MyPolicy3', ruleCombiningAlgId: 'first-applicable' })
  .appliesTo(integerGreaterThan(stringBagSize(Attributes.resource.classification), 0))
  .allowIf(
    dateTimeGreaterThanOrEqual(
      Attributes.environment.currentDateTime,
      dateTimeAddDayTimeDuration(Attributes.resource.createdDateTime, 'P3D'),
    ),
  )
  .denyOtherwise()
  .toJson();
```

### Generating SAML Assertion

For generating SAML Assertions there is a function called `buildSamlResponse`, which takes a single parameter of type object and returns a string with the signed xml.
The parameters are:

* `privateKey` - The private key to use to calculate the signature of the Assertion
* `userEmail` - Email address of the User for whom the Assertion is generated
* `recipientUrl` - URL of the Enrollment Endpoint
* `recipientName` - Assertion Consumer Service name. Configured on the Enrollment Server
* `issuer` - Issuer of the assetion
* `inResponseTo` - Optional. Id of the request. Default is `uuid()`
* `validDaysBefore` - Optional. Default is 0.
* `validDaysAfter` - Optional. Default is 1.

```javascript
const { buildSamlResponse } = require('ionic-admin-sdk');

const samlResponse = buildResponse({
  userEmail: 'username@example.com',
  privateKey: process.env.IONIC_IDENTITY_PROVIDER_PRIVATE_KEY,
  issuer: process.env.IONIC_IDENTITY_PROVIDER_ID,
  recipientUrl: process.env.IONIC_ENROLLMENT_ENDPOINT,
  recipientName: process.env.IONIC_ASSERTION_CONSUMER_SERVICE
});

console.log(samlResponse); // xml string
```

## To Do

* [Bulk Operations](https://dev.ionic.com/api/scim/bulk-operations) in SCIM APIs
* Higher Order Bag functions for condition construction
* Prettier autogenerated descriptions for Policies and Rules
* More tests
* API Reference Documentation
* Downloads and Metrics APIs?
* Publish on NPM
* etc.

## License

This library is released under the [3-clause BSD License](LICENSE).

## Support
If you'd like extra help from our support team, you can contact us at [support.ionicsecurity.com](https://support.ionicsecurity.com/) for questions related to account management, restoring or deleting accounts, billing, technical questions about Ionic tech, and feature requests and bug reports.
