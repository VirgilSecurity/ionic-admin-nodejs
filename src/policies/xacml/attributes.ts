import {
  StringAttributeDesignator,
  DateTimeAttributeDesignator,
  BooleanAttributeDesignator,
  IpAddressAttributeDesignator,
  DoubleAttributeDesignator,
  DateAttributeDesignator,
  TimeAttributeDesignator,
  StringBagAttributeDesignator,
} from './attribute-designator';

export const Attributes = {
  resource: {
    classification: new StringAttributeDesignator('resource', 'classification'),
    createdCostCenter: new StringAttributeDesignator('resource', 'created-cost-center'),
    createdDateTime: new DateTimeAttributeDesignator('resource', 'created-dateTime'),
    createdDepartment: new StringAttributeDesignator('resource', 'created-department'),
    createdDeviceId: new StringAttributeDesignator('resource', 'created-device-id'),
    createdDivision: new StringAttributeDesignator('resource', 'created-division'),
    createdEmployeeNumber: new StringAttributeDesignator('resource', 'created-employee-number'),
    createdExternalId: new StringAttributeDesignator('resource', 'created-external-id'),
    createdGroup: new StringBagAttributeDesignator('resource', 'created-group'),
    createdGroupExternalId: new StringBagAttributeDesignator('resource', 'created-group-external-id'),
    createdGroupName: new StringBagAttributeDesignator('resource', 'created-group-name'),
    createdIonicEnrollmentSourceName: new StringAttributeDesignator('resource', 'created-ionic-enrollment-source-name'),
    createdIonicEnrollmentSourceType: new StringAttributeDesignator('resource', 'created-ionic-enrollment-source-type'),
    createdIonicIsDelegated: new BooleanAttributeDesignator('resource', 'created-ionic-is-delegated'),
    createdIpAddress: new IpAddressAttributeDesignator('resource', 'created-ipAddress'),
    createdLocationCity: new StringAttributeDesignator('resource', 'created-location-city'),
    createdLocationCountry: new StringAttributeDesignator('resource', 'created-location-country'),
    createdLocationLatitude: new DoubleAttributeDesignator('resource', 'created-location-latitude'),
    createdLocationLongitude: new DoubleAttributeDesignator('resource', 'created-location-longitude'),
    createdLocationPostalCode: new StringAttributeDesignator('resource', 'created-location-postalCode'),
    createdLocationRegion: new StringAttributeDesignator('resource', 'created-location-region'),
    createdManager: new StringAttributeDesignator('resource', 'created-manager'),
    createdOrganization: new StringAttributeDesignator('resource', 'created-organization'),
    createdRole: new StringBagAttributeDesignator('resource', 'created-role'),
    createdTimezone: new StringAttributeDesignator('resource', 'created-timezone'),
    createdUserId: new StringAttributeDesignator('resource', 'created-user-id'),
    currentCreatedCostCenter: new StringAttributeDesignator('resource', 'current-created-cost-center'),
    currentCreatedDepartment: new StringAttributeDesignator('resource', 'current-created-department'),
    currentCreatedDivision: new StringAttributeDesignator('resource', 'current-created-division'),
    currentCreatedEmail: new StringAttributeDesignator('resource', 'current-created-email'),
    currentCreatedEmployeeNumber: new StringAttributeDesignator('resource', 'current-created-employee-number'),
    currentCreatedExternalId: new StringAttributeDesignator('resource', 'current-created-external-id'),
    currentCreatedGroup: new StringBagAttributeDesignator('resource', 'current-created-group'),
    currentCreatedGroupExternalId: new StringBagAttributeDesignator('resource', 'current-created-group-external-id'),
    currentCreatedGroupName: new StringBagAttributeDesignator('resource', 'current-created-group-name'),
    currentCreatedManager: new StringAttributeDesignator('resource', 'current-created-manager'),
    currentCreatedOrganization: new StringAttributeDesignator('resource', 'current-created-organization'),
    currentCreatedRole: new StringBagAttributeDesignator('resource', 'current-created-role'),
    currentCreatedUserEnabled: new BooleanAttributeDesignator('resource', 'current-created-user-enabled'),
    currentCreatedUserExists: new BooleanAttributeDesignator('resource', 'current-created-user-exists'),
    currentCreatedUsername: new StringAttributeDesignator('resource', 'current-created-username'),
    ionicCattrIds: new StringBagAttributeDesignator('resource', 'ionic-cattr-ids'),
    ionicDetect: new StringAttributeDesignator('resource', 'ionic-detect'),
    ionicDomain: new StringAttributeDesignator('resource', 'ionic-domain'),
    ionicEmbargo: new DateTimeAttributeDesignator('resource', 'ionic-embargo'),
    ionicExpiration: new DateTimeAttributeDesignator('resource', 'ionic-expiration'),
    ionicExternalId: new StringAttributeDesignator('resource', 'ionic-external-id'),
    ionicHasMarking: new BooleanAttributeDesignator('resource', 'ionic-has-marking'),
    ionicInfoType: new StringAttributeDesignator('resource', 'ionic-info-type'),
    ionicSavedFrom: new StringAttributeDesignator('resource', 'ionic-saved-from'),
    resourceId: new StringAttributeDesignator('resource', 'resource-id'),
  },
  subject: {
    costCenter: new StringAttributeDesignator('subject', 'cost-center'),
    department: new StringAttributeDesignator('subject', 'department'),
    division: new StringAttributeDesignator('subject', 'division'),
    email: new StringAttributeDesignator('subject', 'email'),
    employeeNumber: new StringAttributeDesignator('subject', 'employee-number'),
    externalId: new StringAttributeDesignator('subject', 'external-id'),
    group: new StringBagAttributeDesignator('subject', 'group'),
    groupExternalId: new StringBagAttributeDesignator('subject', 'group-external-id'),
    groupName: new StringBagAttributeDesignator('subject', 'group-name'),
    ionicDelegatorCostCenter: new StringAttributeDesignator('subject', 'ionic-delegator-cost-center'),
    ionicDelegatorDepartment: new StringAttributeDesignator('subject', 'ionic-delegator-department'),
    ionicDelegatorDivision: new StringAttributeDesignator('subject', 'ionic-delegator-division'),
    ionicDelegatorEmail: new StringAttributeDesignator('subject', 'ionic-delegator-email'),
    ionicDelegatorEmployeeNumber: new StringAttributeDesignator('subject', 'ionic-delegator-employee-number'),
    ionicDelegatorExternalId: new StringAttributeDesignator('subject', 'ionic-delegator-external-id'),
    ionicDelegatorGroup: new StringBagAttributeDesignator('subject', 'ionic-delegator-group'),
    ionicDelegatorGroupExternalId: new StringBagAttributeDesignator('subject', 'ionic-delegator-group-external-id'),
    ionicDelegatorGroupName: new StringBagAttributeDesignator('subject', 'ionic-delegator-group-name'),
    ionicDelegatorManager: new StringAttributeDesignator('subject', 'ionic-delegator-manager'),
    ionicDelegatorOrganization: new StringAttributeDesignator('subject', 'ionic-delegator-organization'),
    ionicDelegatorRole: new StringBagAttributeDesignator('subject', 'ionic-delegator-role'),
    ionicDelegatorSubjectId: new StringAttributeDesignator('subject', 'ionic-delegator-subject-id'),
    ionicDelegatorUsername: new StringAttributeDesignator('subject', 'ionic-delegator-username'),
    ionicIsDelegated: new BooleanAttributeDesignator('subject', 'ionic-is-delegated'),
    manager: new StringAttributeDesignator('subject', 'manager'),
    organization: new StringAttributeDesignator('subject', 'organization'),
    role: new StringBagAttributeDesignator('subject', 'role'),
    subjectId: new StringAttributeDesignator('subject', 'subject-id'),
    username: new StringAttributeDesignator('subject', 'username'),
  },
  environment: {
    currentDate: new DateAttributeDesignator('environment', 'current-date'),
    currentDateTime: new DateTimeAttributeDesignator('environment', 'current-dateTime'),
    currentTime: new TimeAttributeDesignator('environment', 'current-time'),
    deviceId: new StringAttributeDesignator('environment', 'device-id'),
    ionicApplicationName: new StringAttributeDesignator('environment', 'ionic-application-name'),
    ionicApplicationVersion: new StringAttributeDesignator('environment', 'ionic-application-version'),
    ionicClientType: new StringAttributeDesignator('environment', 'ionic-client-type'),
    ionicClientVersion: new StringAttributeDesignator('environment', 'ionic-client-version'),
    ionicDelegatorIpAddress: new IpAddressAttributeDesignator('environment', 'ionic-delegator-ipAddress'),
    ionicDelegatorLocationCity: new StringAttributeDesignator('environment', 'ionic-delegator-location-city'),
    ionicDelegatorLocationCountry: new StringAttributeDesignator('environment', 'ionic-delegator-location-country'),
    ionicDelegatorLocationLatitude: new DoubleAttributeDesignator('environment', 'ionic-delegator-location-latitude'),
    ionicDelegatorLocationLongitude: new DoubleAttributeDesignator('environment', 'ionic-delegator-location-longitude'),
    ionicDelegatorLocationPostalCode: new StringAttributeDesignator(
      'environment',
      'ionic-delegator-location-postalCode',
    ),
    ionicDelegatorLocationRegion: new StringAttributeDesignator('environment', 'ionic-delegator-location-region'),
    ionicEnrollmentSourceName: new StringAttributeDesignator('environment', 'ionic-enrollment-source-name'),
    ionicEnrollmentSourceType: new StringAttributeDesignator('environment', 'ionic-enrollment-source-type'),
    ionicMarkingIds: new StringBagAttributeDesignator('environment', 'ionic-marking-ids'),
    ionicOsName: new StringAttributeDesignator('environment', 'ionic-os-name'),
    ionicOsVersion: new StringAttributeDesignator('environment', 'ionic-os-version'),
    ipAddress: new IpAddressAttributeDesignator('environment', 'ipAddress'),
    locationCity: new StringAttributeDesignator('environment', 'location-city'),
    locationCountry: new StringAttributeDesignator('environment', 'location-country'),
    locationLatitude: new DoubleAttributeDesignator('environment', 'location-latitude'),
    locationLongitude: new DoubleAttributeDesignator('environment', 'location-longitude'),
    locationPostalCode: new StringAttributeDesignator('environment', 'location-postalCode'),
    locationRegion: new StringAttributeDesignator('environment', 'location-region'),
    timezone: new StringAttributeDesignator('environment', 'timezone'),
  },
};
