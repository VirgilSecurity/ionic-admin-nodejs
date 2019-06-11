import {
  StringAttributeDesignator,
  DateAttributeDesignator,
  IntegerAttributeDesignator,
  DoubleAttributeDesignator,
  BooleanAttributeDesignator,
  IpAddressAttributeDesignator,
  DateTimeAttributeDesignator,
  TimeAttributeDesignator,
  StringBagAttributeDesignator,
  BooleanBagAttributeDesignator,
  IpAddressBagAttributeDesignator,
  DateTimeBagAttributeDesignator,
  DateBagAttributeDesignator,
  IntegerBagAttributeDesignator,
  TimeBagAttributeDesignator,
  DoubleBagAttributeDesignator,
} from './attribute-designator';
import {
  XacmlStringFunction,
  XacmlBooleanFunction,
  XacmlDateFunction,
  XacmlDayTimeDurationFunction,
  XacmlIntegerFunction,
  XacmlDoubleFunction,
  XacmlIpAddressFunction,
  XacmlDateTimeFunction,
  XacmlTimeFunction,
  XacmlYearMonthDurationFunction,
  XacmlStringBagFunction,
  XacmlIntegerBagFunction,
  XacmlDoubleBagFunction,
  XacmlTimeBagFunction,
  XacmlDateBagFunction,
  XacmlDateTimeBagFunction,
  XacmlIpAddressBagFunction,
  XacmlBooleanBagFunction,
} from './xacml-function';
import { anyToConditionExpressionNode } from './utils';

export function integerAdd(...args: (IntegerAttributeDesignator | XacmlIntegerFunction | number)[]) {
  return new XacmlIntegerFunction('integer-add', [...args.map(arg => anyToConditionExpressionNode(arg, 'integer'))]);
}
export function integerSubtract(
  arg1: IntegerAttributeDesignator | XacmlIntegerFunction | number,
  arg2: IntegerAttributeDesignator | XacmlIntegerFunction | number,
) {
  return new XacmlIntegerFunction('integer-subtract', [
    anyToConditionExpressionNode(arg1, 'integer'),
    anyToConditionExpressionNode(arg2, 'integer'),
  ]);
}
export function integerMultiply(...args: (IntegerAttributeDesignator | XacmlIntegerFunction | number)[]) {
  return new XacmlIntegerFunction('integer-multiply', [
    ...args.map(arg => anyToConditionExpressionNode(arg, 'integer')),
  ]);
}
export function integerDivide(
  arg1: IntegerAttributeDesignator | XacmlIntegerFunction | number,
  arg2: IntegerAttributeDesignator | XacmlIntegerFunction | number,
) {
  return new XacmlIntegerFunction('integer-divide', [
    anyToConditionExpressionNode(arg1, 'integer'),
    anyToConditionExpressionNode(arg2, 'integer'),
  ]);
}
export function integerMod(
  arg1: IntegerAttributeDesignator | XacmlIntegerFunction | number,
  arg2: IntegerAttributeDesignator | XacmlIntegerFunction | number,
) {
  return new XacmlIntegerFunction('integer-mod', [
    anyToConditionExpressionNode(arg1, 'integer'),
    anyToConditionExpressionNode(arg2, 'integer'),
  ]);
}
export function integerAbs(arg1: IntegerAttributeDesignator | XacmlIntegerFunction | number) {
  return new XacmlIntegerFunction('integer-abs', [anyToConditionExpressionNode(arg1, 'integer')]);
}
export function integerRound(arg1: IntegerAttributeDesignator | XacmlIntegerFunction | number) {
  return new XacmlIntegerFunction('integer-round', [anyToConditionExpressionNode(arg1, 'integer')]);
}
export function integerFloor(arg1: IntegerAttributeDesignator | XacmlIntegerFunction | number) {
  return new XacmlIntegerFunction('integer-floor', [anyToConditionExpressionNode(arg1, 'integer')]);
}
export function doubleAdd(...args: (DoubleAttributeDesignator | XacmlDoubleFunction | number)[]) {
  return new XacmlDoubleFunction('double-add', [...args.map(arg => anyToConditionExpressionNode(arg, 'double'))]);
}
export function doubleSubtract(
  arg1: DoubleAttributeDesignator | XacmlDoubleFunction | number,
  arg2: DoubleAttributeDesignator | XacmlDoubleFunction | number,
) {
  return new XacmlDoubleFunction('double-subtract', [
    anyToConditionExpressionNode(arg1, 'double'),
    anyToConditionExpressionNode(arg2, 'double'),
  ]);
}
export function doubleMultiply(...args: (DoubleAttributeDesignator | XacmlDoubleFunction | number)[]) {
  return new XacmlDoubleFunction('double-multiply', [...args.map(arg => anyToConditionExpressionNode(arg, 'double'))]);
}
export function doubleDivide(
  arg1: DoubleAttributeDesignator | XacmlDoubleFunction | number,
  arg2: DoubleAttributeDesignator | XacmlDoubleFunction | number,
) {
  return new XacmlDoubleFunction('double-divide', [
    anyToConditionExpressionNode(arg1, 'double'),
    anyToConditionExpressionNode(arg2, 'double'),
  ]);
}
export function doubleMod(
  arg1: DoubleAttributeDesignator | XacmlDoubleFunction | number,
  arg2: DoubleAttributeDesignator | XacmlDoubleFunction | number,
) {
  return new XacmlDoubleFunction('double-mod', [
    anyToConditionExpressionNode(arg1, 'double'),
    anyToConditionExpressionNode(arg2, 'double'),
  ]);
}
export function doubleAbs(arg1: DoubleAttributeDesignator | XacmlDoubleFunction | number) {
  return new XacmlDoubleFunction('double-abs', [anyToConditionExpressionNode(arg1, 'double')]);
}
export function doubleRound(arg1: DoubleAttributeDesignator | XacmlDoubleFunction | number) {
  return new XacmlDoubleFunction('double-round', [anyToConditionExpressionNode(arg1, 'double')]);
}
export function doubleFloor(arg1: DoubleAttributeDesignator | XacmlDoubleFunction | number) {
  return new XacmlDoubleFunction('double-floor', [anyToConditionExpressionNode(arg1, 'double')]);
}
export function stringNormalizeSpace(arg1: StringAttributeDesignator | XacmlStringFunction | string) {
  return new XacmlStringFunction('string-normalize-space', [anyToConditionExpressionNode(arg1, 'string')]);
}
export function stringNormalizeToLowerCase(arg1: StringAttributeDesignator | XacmlStringFunction | string) {
  return new XacmlStringFunction('string-normalize-to-lower-case', [anyToConditionExpressionNode(arg1, 'string')]);
}
export function integerToDouble(arg1: IntegerAttributeDesignator | XacmlIntegerFunction | number) {
  return new XacmlDoubleFunction('integer-to-double', [anyToConditionExpressionNode(arg1, 'integer')]);
}
export function doubleToInteger(arg1: DoubleAttributeDesignator | XacmlDoubleFunction | number) {
  return new XacmlIntegerFunction('double-to-integer', [anyToConditionExpressionNode(arg1, 'double')]);
}
export function or(...args: (BooleanAttributeDesignator | XacmlBooleanFunction | boolean)[]) {
  return new XacmlBooleanFunction('or', [...args.map(arg => anyToConditionExpressionNode(arg, 'boolean'))]);
}
export function and(...args: (BooleanAttributeDesignator | XacmlBooleanFunction | boolean)[]) {
  return new XacmlBooleanFunction('and', [...args.map(arg => anyToConditionExpressionNode(arg, 'boolean'))]);
}
export function not(arg1: BooleanAttributeDesignator | XacmlBooleanFunction | boolean) {
  return new XacmlBooleanFunction('not', [anyToConditionExpressionNode(arg1, 'boolean')]);
}
export function nOf(...args: (BooleanAttributeDesignator | XacmlBooleanFunction | boolean)[]) {
  return new XacmlBooleanFunction('n-of', [...args.map(arg => anyToConditionExpressionNode(arg, 'boolean'))]);
}
export function stringEqual(
  arg1: StringAttributeDesignator | XacmlStringFunction | string,
  arg2: StringAttributeDesignator | XacmlStringFunction | string,
) {
  return new XacmlBooleanFunction('string-equal', [
    anyToConditionExpressionNode(arg1, 'string'),
    anyToConditionExpressionNode(arg2, 'string'),
  ]);
}
export function stringGreaterThan(
  arg1: StringAttributeDesignator | XacmlStringFunction | string,
  arg2: StringAttributeDesignator | XacmlStringFunction | string,
) {
  return new XacmlBooleanFunction('string-greater-than', [
    anyToConditionExpressionNode(arg1, 'string'),
    anyToConditionExpressionNode(arg2, 'string'),
  ]);
}
export function stringGreaterThanOrEqual(
  arg1: StringAttributeDesignator | XacmlStringFunction | string,
  arg2: StringAttributeDesignator | XacmlStringFunction | string,
) {
  return new XacmlBooleanFunction('string-greater-than-or-equal', [
    anyToConditionExpressionNode(arg1, 'string'),
    anyToConditionExpressionNode(arg2, 'string'),
  ]);
}
export function stringLessThan(
  arg1: StringAttributeDesignator | XacmlStringFunction | string,
  arg2: StringAttributeDesignator | XacmlStringFunction | string,
) {
  return new XacmlBooleanFunction('string-less-than', [
    anyToConditionExpressionNode(arg1, 'string'),
    anyToConditionExpressionNode(arg2, 'string'),
  ]);
}
export function stringLessThanOrEqual(
  arg1: StringAttributeDesignator | XacmlStringFunction | string,
  arg2: StringAttributeDesignator | XacmlStringFunction | string,
) {
  return new XacmlBooleanFunction('string-less-than-or-equal', [
    anyToConditionExpressionNode(arg1, 'string'),
    anyToConditionExpressionNode(arg2, 'string'),
  ]);
}
export function integerEqual(
  arg1: IntegerAttributeDesignator | XacmlIntegerFunction | number,
  arg2: IntegerAttributeDesignator | XacmlIntegerFunction | number,
) {
  return new XacmlBooleanFunction('integer-equal', [
    anyToConditionExpressionNode(arg1, 'integer'),
    anyToConditionExpressionNode(arg2, 'integer'),
  ]);
}
export function integerGreaterThan(
  arg1: IntegerAttributeDesignator | XacmlIntegerFunction | number,
  arg2: IntegerAttributeDesignator | XacmlIntegerFunction | number,
) {
  return new XacmlBooleanFunction('integer-greater-than', [
    anyToConditionExpressionNode(arg1, 'integer'),
    anyToConditionExpressionNode(arg2, 'integer'),
  ]);
}
export function integerGreaterThanOrEqual(
  arg1: IntegerAttributeDesignator | XacmlIntegerFunction | number,
  arg2: IntegerAttributeDesignator | XacmlIntegerFunction | number,
) {
  return new XacmlBooleanFunction('integer-greater-than-or-equal', [
    anyToConditionExpressionNode(arg1, 'integer'),
    anyToConditionExpressionNode(arg2, 'integer'),
  ]);
}
export function integerLessThan(
  arg1: IntegerAttributeDesignator | XacmlIntegerFunction | number,
  arg2: IntegerAttributeDesignator | XacmlIntegerFunction | number,
) {
  return new XacmlBooleanFunction('integer-less-than', [
    anyToConditionExpressionNode(arg1, 'integer'),
    anyToConditionExpressionNode(arg2, 'integer'),
  ]);
}
export function integerLessThanOrEqual(
  arg1: IntegerAttributeDesignator | XacmlIntegerFunction | number,
  arg2: IntegerAttributeDesignator | XacmlIntegerFunction | number,
) {
  return new XacmlBooleanFunction('integer-less-than-or-equal', [
    anyToConditionExpressionNode(arg1, 'integer'),
    anyToConditionExpressionNode(arg2, 'integer'),
  ]);
}
export function doubleEqual(
  arg1: DoubleAttributeDesignator | XacmlDoubleFunction | number,
  arg2: DoubleAttributeDesignator | XacmlDoubleFunction | number,
) {
  return new XacmlBooleanFunction('double-equal', [
    anyToConditionExpressionNode(arg1, 'double'),
    anyToConditionExpressionNode(arg2, 'double'),
  ]);
}
export function doubleGreaterThan(
  arg1: DoubleAttributeDesignator | XacmlDoubleFunction | number,
  arg2: DoubleAttributeDesignator | XacmlDoubleFunction | number,
) {
  return new XacmlBooleanFunction('double-greater-than', [
    anyToConditionExpressionNode(arg1, 'double'),
    anyToConditionExpressionNode(arg2, 'double'),
  ]);
}
export function doubleGreaterThanOrEqual(
  arg1: DoubleAttributeDesignator | XacmlDoubleFunction | number,
  arg2: DoubleAttributeDesignator | XacmlDoubleFunction | number,
) {
  return new XacmlBooleanFunction('double-greater-than-or-equal', [
    anyToConditionExpressionNode(arg1, 'double'),
    anyToConditionExpressionNode(arg2, 'double'),
  ]);
}
export function doubleLessThan(
  arg1: DoubleAttributeDesignator | XacmlDoubleFunction | number,
  arg2: DoubleAttributeDesignator | XacmlDoubleFunction | number,
) {
  return new XacmlBooleanFunction('double-less-than', [
    anyToConditionExpressionNode(arg1, 'double'),
    anyToConditionExpressionNode(arg2, 'double'),
  ]);
}
export function doubleLessThanOrEqual(
  arg1: DoubleAttributeDesignator | XacmlDoubleFunction | number,
  arg2: DoubleAttributeDesignator | XacmlDoubleFunction | number,
) {
  return new XacmlBooleanFunction('double-less-than-or-equal', [
    anyToConditionExpressionNode(arg1, 'double'),
    anyToConditionExpressionNode(arg2, 'double'),
  ]);
}
export function ipAddressEqual(
  arg1: IpAddressAttributeDesignator | XacmlIpAddressFunction | string,
  arg2: IpAddressAttributeDesignator | XacmlIpAddressFunction | string,
) {
  return new XacmlBooleanFunction('ipAddress-equal', [
    anyToConditionExpressionNode(arg1, 'ipAddress'),
    anyToConditionExpressionNode(arg2, 'ipAddress'),
  ]);
}
export function ipAddressGreaterThan(
  arg1: IpAddressAttributeDesignator | XacmlIpAddressFunction | string,
  arg2: IpAddressAttributeDesignator | XacmlIpAddressFunction | string,
) {
  return new XacmlBooleanFunction('ipAddress-greater-than', [
    anyToConditionExpressionNode(arg1, 'ipAddress'),
    anyToConditionExpressionNode(arg2, 'ipAddress'),
  ]);
}
export function ipAddressGreaterThanOrEqual(
  arg1: IpAddressAttributeDesignator | XacmlIpAddressFunction | string,
  arg2: IpAddressAttributeDesignator | XacmlIpAddressFunction | string,
) {
  return new XacmlBooleanFunction('ipAddress-greater-than-or-equal', [
    anyToConditionExpressionNode(arg1, 'ipAddress'),
    anyToConditionExpressionNode(arg2, 'ipAddress'),
  ]);
}
export function ipAddressLessThan(
  arg1: IpAddressAttributeDesignator | XacmlIpAddressFunction | string,
  arg2: IpAddressAttributeDesignator | XacmlIpAddressFunction | string,
) {
  return new XacmlBooleanFunction('ipAddress-less-than', [
    anyToConditionExpressionNode(arg1, 'ipAddress'),
    anyToConditionExpressionNode(arg2, 'ipAddress'),
  ]);
}
export function ipAddressLessThanOrEqual(
  arg1: IpAddressAttributeDesignator | XacmlIpAddressFunction | string,
  arg2: IpAddressAttributeDesignator | XacmlIpAddressFunction | string,
) {
  return new XacmlBooleanFunction('ipAddress-less-than-or-equal', [
    anyToConditionExpressionNode(arg1, 'ipAddress'),
    anyToConditionExpressionNode(arg2, 'ipAddress'),
  ]);
}
export function dateTimeEqual(
  arg1: DateTimeAttributeDesignator | XacmlDateTimeFunction | Date,
  arg2: DateTimeAttributeDesignator | XacmlDateTimeFunction | Date,
) {
  return new XacmlBooleanFunction('dateTime-equal', [
    anyToConditionExpressionNode(arg1, 'dateTime'),
    anyToConditionExpressionNode(arg2, 'dateTime'),
  ]);
}
export function dateTimeGreaterThan(
  arg1: DateTimeAttributeDesignator | XacmlDateTimeFunction | Date,
  arg2: DateTimeAttributeDesignator | XacmlDateTimeFunction | Date,
) {
  return new XacmlBooleanFunction('dateTime-greater-than', [
    anyToConditionExpressionNode(arg1, 'dateTime'),
    anyToConditionExpressionNode(arg2, 'dateTime'),
  ]);
}
export function dateTimeGreaterThanOrEqual(
  arg1: DateTimeAttributeDesignator | XacmlDateTimeFunction | Date,
  arg2: DateTimeAttributeDesignator | XacmlDateTimeFunction | Date,
) {
  return new XacmlBooleanFunction('dateTime-greater-than-or-equal', [
    anyToConditionExpressionNode(arg1, 'dateTime'),
    anyToConditionExpressionNode(arg2, 'dateTime'),
  ]);
}
export function dateTimeLessThan(
  arg1: DateTimeAttributeDesignator | XacmlDateTimeFunction | Date,
  arg2: DateTimeAttributeDesignator | XacmlDateTimeFunction | Date,
) {
  return new XacmlBooleanFunction('dateTime-less-than', [
    anyToConditionExpressionNode(arg1, 'dateTime'),
    anyToConditionExpressionNode(arg2, 'dateTime'),
  ]);
}
export function dateTimeLessThanOrEqual(
  arg1: DateTimeAttributeDesignator | XacmlDateTimeFunction | Date,
  arg2: DateTimeAttributeDesignator | XacmlDateTimeFunction | Date,
) {
  return new XacmlBooleanFunction('dateTime-less-than-or-equal', [
    anyToConditionExpressionNode(arg1, 'dateTime'),
    anyToConditionExpressionNode(arg2, 'dateTime'),
  ]);
}
export function dateEqual(
  arg1: DateAttributeDesignator | XacmlDateFunction | Date,
  arg2: DateAttributeDesignator | XacmlDateFunction | Date,
) {
  return new XacmlBooleanFunction('date-equal', [
    anyToConditionExpressionNode(arg1, 'date'),
    anyToConditionExpressionNode(arg2, 'date'),
  ]);
}
export function dateGreaterThan(
  arg1: DateAttributeDesignator | XacmlDateFunction | Date,
  arg2: DateAttributeDesignator | XacmlDateFunction | Date,
) {
  return new XacmlBooleanFunction('date-greater-than', [
    anyToConditionExpressionNode(arg1, 'date'),
    anyToConditionExpressionNode(arg2, 'date'),
  ]);
}
export function dateGreaterThanOrEqual(
  arg1: DateAttributeDesignator | XacmlDateFunction | Date,
  arg2: DateAttributeDesignator | XacmlDateFunction | Date,
) {
  return new XacmlBooleanFunction('date-greater-than-or-equal', [
    anyToConditionExpressionNode(arg1, 'date'),
    anyToConditionExpressionNode(arg2, 'date'),
  ]);
}
export function dateLessThan(
  arg1: DateAttributeDesignator | XacmlDateFunction | Date,
  arg2: DateAttributeDesignator | XacmlDateFunction | Date,
) {
  return new XacmlBooleanFunction('date-less-than', [
    anyToConditionExpressionNode(arg1, 'date'),
    anyToConditionExpressionNode(arg2, 'date'),
  ]);
}
export function dateLessThanOrEqual(
  arg1: DateAttributeDesignator | XacmlDateFunction | Date,
  arg2: DateAttributeDesignator | XacmlDateFunction | Date,
) {
  return new XacmlBooleanFunction('date-less-than-or-equal', [
    anyToConditionExpressionNode(arg1, 'date'),
    anyToConditionExpressionNode(arg2, 'date'),
  ]);
}
export function timeEqual(
  arg1: TimeAttributeDesignator | XacmlTimeFunction | string,
  arg2: TimeAttributeDesignator | XacmlTimeFunction | string,
) {
  return new XacmlBooleanFunction('time-equal', [
    anyToConditionExpressionNode(arg1, 'time'),
    anyToConditionExpressionNode(arg2, 'time'),
  ]);
}
export function timeGreaterThan(
  arg1: TimeAttributeDesignator | XacmlTimeFunction | string,
  arg2: TimeAttributeDesignator | XacmlTimeFunction | string,
) {
  return new XacmlBooleanFunction('time-greater-than', [
    anyToConditionExpressionNode(arg1, 'time'),
    anyToConditionExpressionNode(arg2, 'time'),
  ]);
}
export function timeGreaterThanOrEqual(
  arg1: TimeAttributeDesignator | XacmlTimeFunction | string,
  arg2: TimeAttributeDesignator | XacmlTimeFunction | string,
) {
  return new XacmlBooleanFunction('time-greater-than-or-equal', [
    anyToConditionExpressionNode(arg1, 'time'),
    anyToConditionExpressionNode(arg2, 'time'),
  ]);
}
export function timeLessThan(
  arg1: TimeAttributeDesignator | XacmlTimeFunction | string,
  arg2: TimeAttributeDesignator | XacmlTimeFunction | string,
) {
  return new XacmlBooleanFunction('time-less-than', [
    anyToConditionExpressionNode(arg1, 'time'),
    anyToConditionExpressionNode(arg2, 'time'),
  ]);
}
export function timeLessThanOrEqual(
  arg1: TimeAttributeDesignator | XacmlTimeFunction | string,
  arg2: TimeAttributeDesignator | XacmlTimeFunction | string,
) {
  return new XacmlBooleanFunction('time-less-than-or-equal', [
    anyToConditionExpressionNode(arg1, 'time'),
    anyToConditionExpressionNode(arg2, 'time'),
  ]);
}
export function dateTimeAddDayTimeDuration(
  arg1: DateTimeAttributeDesignator | XacmlDateTimeFunction | Date,
  arg2: XacmlDayTimeDurationFunction | string,
) {
  return new XacmlDateTimeFunction('dateTime-add-dayTimeDuration', [
    anyToConditionExpressionNode(arg1, 'dateTime'),
    anyToConditionExpressionNode(arg2, 'dayTimeDuration'),
  ]);
}
export function dateTimeAddYearMonthDuration(
  arg1: DateTimeAttributeDesignator | XacmlDateTimeFunction | Date,
  arg2: XacmlYearMonthDurationFunction | string,
) {
  return new XacmlDateTimeFunction('dateTime-add-yearMonthDuration', [
    anyToConditionExpressionNode(arg1, 'dateTime'),
    anyToConditionExpressionNode(arg2, 'yearMonthDuration'),
  ]);
}
export function dateAddDayTimeDuration(
  arg1: DateAttributeDesignator | XacmlDateFunction | Date,
  arg2: XacmlDayTimeDurationFunction | string,
) {
  return new XacmlDateFunction('date-add-dayTimeDuration', [
    anyToConditionExpressionNode(arg1, 'date'),
    anyToConditionExpressionNode(arg2, 'dayTimeDuration'),
  ]);
}
export function dateAddYearMonthDuration(
  arg1: DateAttributeDesignator | XacmlDateFunction | Date,
  arg2: XacmlYearMonthDurationFunction | string,
) {
  return new XacmlDateFunction('date-add-yearMonthDuration', [
    anyToConditionExpressionNode(arg1, 'date'),
    anyToConditionExpressionNode(arg2, 'yearMonthDuration'),
  ]);
}
export function stringEqualIgnoreCase(
  arg1: StringAttributeDesignator | XacmlStringFunction | string,
  arg2: StringAttributeDesignator | XacmlStringFunction | string,
) {
  return new XacmlBooleanFunction('string-equal-ignore-case', [
    anyToConditionExpressionNode(arg1, 'string'),
    anyToConditionExpressionNode(arg2, 'string'),
  ]);
}
export function stringRegexpMatch(
  arg1: StringAttributeDesignator | XacmlStringFunction | string,
  arg2: StringAttributeDesignator | XacmlStringFunction | string,
) {
  return new XacmlBooleanFunction('string-regexp-match', [
    anyToConditionExpressionNode(arg1, 'string'),
    anyToConditionExpressionNode(arg2, 'string'),
  ]);
}
export function stringContains(
  arg1: StringAttributeDesignator | XacmlStringFunction | string,
  arg2: StringAttributeDesignator | XacmlStringFunction | string,
) {
  return new XacmlBooleanFunction('string-contains', [
    anyToConditionExpressionNode(arg1, 'string'),
    anyToConditionExpressionNode(arg2, 'string'),
  ]);
}
export function stringStartsWith(
  arg1: StringAttributeDesignator | XacmlStringFunction | string,
  arg2: StringAttributeDesignator | XacmlStringFunction | string,
) {
  return new XacmlBooleanFunction('string-starts-with', [
    anyToConditionExpressionNode(arg1, 'string'),
    anyToConditionExpressionNode(arg2, 'string'),
  ]);
}
export function stringEndsWith(
  arg1: StringAttributeDesignator | XacmlStringFunction | string,
  arg2: StringAttributeDesignator | XacmlStringFunction | string,
) {
  return new XacmlBooleanFunction('string-ends-with', [
    anyToConditionExpressionNode(arg1, 'string'),
    anyToConditionExpressionNode(arg2, 'string'),
  ]);
}
export function stringConcatenate(...args: (StringAttributeDesignator | XacmlStringFunction | string)[]) {
  return new XacmlStringFunction('string-concatenate', [
    ...args.map(arg => anyToConditionExpressionNode(arg, 'string')),
  ]);
}
export function stringSubstring(
  arg1: StringAttributeDesignator | XacmlStringFunction | string,
  arg2: IntegerAttributeDesignator | XacmlIntegerFunction | number,
  arg3: IntegerAttributeDesignator | XacmlIntegerFunction | number,
) {
  return new XacmlStringFunction('string-substring', [
    anyToConditionExpressionNode(arg1, 'string'),
    anyToConditionExpressionNode(arg2, 'integer'),
    anyToConditionExpressionNode(arg3, 'integer'),
  ]);
}
export function stringBag(...args: (StringAttributeDesignator | XacmlStringFunction | string)[]) {
  return new XacmlStringBagFunction('string-bag', [...args.map(arg => anyToConditionExpressionNode(arg, 'string'))]);
}
export function stringOneAndOnly(arg1: StringBagAttributeDesignator | XacmlStringBagFunction | string[]) {
  return new XacmlStringFunction('string-one-and-only', [anyToConditionExpressionNode(arg1, 'stringBag')]);
}
export function stringBagSize(arg1: StringBagAttributeDesignator | XacmlStringBagFunction | string[]) {
  return new XacmlIntegerFunction('string-bag-size', [anyToConditionExpressionNode(arg1, 'stringBag')]);
}
export function booleanBag(...args: (BooleanAttributeDesignator | XacmlBooleanFunction | boolean)[]) {
  return new XacmlBooleanBagFunction('boolean-bag', [...args.map(arg => anyToConditionExpressionNode(arg, 'boolean'))]);
}
export function booleanOneAndOnly(arg1: BooleanBagAttributeDesignator | XacmlBooleanBagFunction | boolean[]) {
  return new XacmlBooleanFunction('boolean-one-and-only', [anyToConditionExpressionNode(arg1, 'booleanBag')]);
}
export function booleanBagSize(arg1: BooleanBagAttributeDesignator | XacmlBooleanBagFunction | boolean[]) {
  return new XacmlIntegerFunction('boolean-bag-size', [anyToConditionExpressionNode(arg1, 'booleanBag')]);
}
export function integerBag(...args: (IntegerAttributeDesignator | XacmlIntegerFunction | number)[]) {
  return new XacmlIntegerBagFunction('integer-bag', [...args.map(arg => anyToConditionExpressionNode(arg, 'integer'))]);
}
export function integerOneAndOnly(arg1: IntegerBagAttributeDesignator | XacmlIntegerBagFunction | number[]) {
  return new XacmlIntegerFunction('integer-one-and-only', [anyToConditionExpressionNode(arg1, 'integerBag')]);
}
export function integerBagSize(arg1: IntegerBagAttributeDesignator | XacmlIntegerBagFunction | number[]) {
  return new XacmlIntegerFunction('integer-bag-size', [anyToConditionExpressionNode(arg1, 'integerBag')]);
}
export function doubleBag(...args: (DoubleAttributeDesignator | XacmlDoubleFunction | number)[]) {
  return new XacmlDoubleBagFunction('double-bag', [...args.map(arg => anyToConditionExpressionNode(arg, 'double'))]);
}
export function doubleOneAndOnly(arg1: DoubleBagAttributeDesignator | XacmlDoubleBagFunction | number[]) {
  return new XacmlDoubleFunction('double-one-and-only', [anyToConditionExpressionNode(arg1, 'doubleBag')]);
}
export function doubleBagSize(arg1: DoubleBagAttributeDesignator | XacmlDoubleBagFunction | number[]) {
  return new XacmlIntegerFunction('double-bag-size', [anyToConditionExpressionNode(arg1, 'doubleBag')]);
}
export function timeBag(...args: (TimeAttributeDesignator | XacmlTimeFunction | string)[]) {
  return new XacmlTimeBagFunction('time-bag', [...args.map(arg => anyToConditionExpressionNode(arg, 'time'))]);
}
export function timeOneAndOnly(arg1: TimeBagAttributeDesignator | XacmlTimeBagFunction | string[]) {
  return new XacmlTimeFunction('time-one-and-only', [anyToConditionExpressionNode(arg1, 'timeBag')]);
}
export function timeBagSize(arg1: TimeBagAttributeDesignator | XacmlTimeBagFunction | string[]) {
  return new XacmlIntegerFunction('time-bag-size', [anyToConditionExpressionNode(arg1, 'timeBag')]);
}
export function dateBag(...args: (DateAttributeDesignator | XacmlDateFunction | Date)[]) {
  return new XacmlDateBagFunction('date-bag', [...args.map(arg => anyToConditionExpressionNode(arg, 'date'))]);
}
export function dateOneAndOnly(arg1: DateBagAttributeDesignator | XacmlDateBagFunction | Date[]) {
  return new XacmlDateFunction('date-one-and-only', [anyToConditionExpressionNode(arg1, 'dateBag')]);
}
export function dateBagSize(arg1: DateBagAttributeDesignator | XacmlDateBagFunction | Date[]) {
  return new XacmlIntegerFunction('date-bag-size', [anyToConditionExpressionNode(arg1, 'dateBag')]);
}
export function dateTimeBag(...args: (DateTimeAttributeDesignator | XacmlDateTimeFunction | Date)[]) {
  return new XacmlDateTimeBagFunction('dateTime-bag', [
    ...args.map(arg => anyToConditionExpressionNode(arg, 'dateTime')),
  ]);
}
export function dateTimeOneAndOnly(arg1: DateTimeBagAttributeDesignator | XacmlDateTimeBagFunction | Date[]) {
  return new XacmlDateTimeFunction('dateTime-one-and-only', [anyToConditionExpressionNode(arg1, 'dateTimeBag')]);
}
export function dateTimeBagSize(arg1: DateTimeBagAttributeDesignator | XacmlDateTimeBagFunction | Date[]) {
  return new XacmlIntegerFunction('dateTime-bag-size', [anyToConditionExpressionNode(arg1, 'dateTimeBag')]);
}
export function ipAddressBag(...args: (IpAddressAttributeDesignator | XacmlIpAddressFunction | string)[]) {
  return new XacmlIpAddressBagFunction('ipAddress-bag', [
    ...args.map(arg => anyToConditionExpressionNode(arg, 'ipAddress')),
  ]);
}
export function ipAddressOneAndOnly(arg1: IpAddressBagAttributeDesignator | XacmlIpAddressBagFunction | string[]) {
  return new XacmlIpAddressFunction('ipAddress-one-and-only', [anyToConditionExpressionNode(arg1, 'ipAddressBag')]);
}
export function ipAddressBagSize(arg1: IpAddressBagAttributeDesignator | XacmlIpAddressBagFunction | string[]) {
  return new XacmlIntegerFunction('ipAddress-bag-size', [anyToConditionExpressionNode(arg1, 'ipAddressBag')]);
}
export function stringAtLeastOneMemberOf(
  arg1: StringBagAttributeDesignator | XacmlStringBagFunction | string[],
  arg2: StringBagAttributeDesignator | XacmlStringBagFunction | string[],
) {
  return new XacmlBooleanFunction('string-at-least-one-member-of', [
    anyToConditionExpressionNode(arg1, 'stringBag'),
    anyToConditionExpressionNode(arg2, 'stringBag'),
  ]);
}
export function stringSubset(
  arg1: StringBagAttributeDesignator | XacmlStringBagFunction | string[],
  arg2: StringBagAttributeDesignator | XacmlStringBagFunction | string[],
) {
  return new XacmlBooleanFunction('string-subset', [
    anyToConditionExpressionNode(arg1, 'stringBag'),
    anyToConditionExpressionNode(arg2, 'stringBag'),
  ]);
}
export function stringSetEquals(
  arg1: StringBagAttributeDesignator | XacmlStringBagFunction | string[],
  arg2: StringBagAttributeDesignator | XacmlStringBagFunction | string[],
) {
  return new XacmlBooleanFunction('string-set-equals', [
    anyToConditionExpressionNode(arg1, 'stringBag'),
    anyToConditionExpressionNode(arg2, 'stringBag'),
  ]);
}
export function stringIsIn(
  arg1: StringAttributeDesignator | XacmlStringFunction | string,
  arg2: StringBagAttributeDesignator | XacmlStringBagFunction | string[],
) {
  return new XacmlBooleanFunction('string-is-in', [
    anyToConditionExpressionNode(arg1, 'string'),
    anyToConditionExpressionNode(arg2, 'stringBag'),
  ]);
}
export function stringIntersection(
  arg1: StringBagAttributeDesignator | XacmlStringBagFunction | string[],
  arg2: StringBagAttributeDesignator | XacmlStringBagFunction | string[],
) {
  return new XacmlStringBagFunction('string-intersection', [
    anyToConditionExpressionNode(arg1, 'stringBag'),
    anyToConditionExpressionNode(arg2, 'stringBag'),
  ]);
}
export function stringUnion(...args: (StringBagAttributeDesignator | XacmlStringBagFunction | string[])[]) {
  return new XacmlStringBagFunction('string-union', [
    ...args.map(arg => anyToConditionExpressionNode(arg, 'stringBag')),
  ]);
}
export function booleanAtLeastOneMemberOf(
  arg1: BooleanBagAttributeDesignator | XacmlBooleanBagFunction | boolean[],
  arg2: BooleanBagAttributeDesignator | XacmlBooleanBagFunction | boolean[],
) {
  return new XacmlBooleanFunction('boolean-at-least-one-member-of', [
    anyToConditionExpressionNode(arg1, 'booleanBag'),
    anyToConditionExpressionNode(arg2, 'booleanBag'),
  ]);
}
export function booleanSubset(
  arg1: BooleanBagAttributeDesignator | XacmlBooleanBagFunction | boolean[],
  arg2: BooleanBagAttributeDesignator | XacmlBooleanBagFunction | boolean[],
) {
  return new XacmlBooleanFunction('boolean-subset', [
    anyToConditionExpressionNode(arg1, 'booleanBag'),
    anyToConditionExpressionNode(arg2, 'booleanBag'),
  ]);
}
export function booleanSetEquals(
  arg1: BooleanBagAttributeDesignator | XacmlBooleanBagFunction | boolean[],
  arg2: BooleanBagAttributeDesignator | XacmlBooleanBagFunction | boolean[],
) {
  return new XacmlBooleanFunction('boolean-set-equals', [
    anyToConditionExpressionNode(arg1, 'booleanBag'),
    anyToConditionExpressionNode(arg2, 'booleanBag'),
  ]);
}
export function booleanIsIn(
  arg1: BooleanAttributeDesignator | XacmlBooleanFunction | boolean,
  arg2: BooleanBagAttributeDesignator | XacmlBooleanBagFunction | boolean[],
) {
  return new XacmlBooleanFunction('boolean-is-in', [
    anyToConditionExpressionNode(arg1, 'boolean'),
    anyToConditionExpressionNode(arg2, 'booleanBag'),
  ]);
}
export function booleanIntersection(
  arg1: BooleanBagAttributeDesignator | XacmlBooleanBagFunction | boolean[],
  arg2: BooleanBagAttributeDesignator | XacmlBooleanBagFunction | boolean[],
) {
  return new XacmlBooleanBagFunction('boolean-intersection', [
    anyToConditionExpressionNode(arg1, 'booleanBag'),
    anyToConditionExpressionNode(arg2, 'booleanBag'),
  ]);
}
export function booleanUnion(...args: (BooleanBagAttributeDesignator | XacmlBooleanBagFunction | boolean[])[]) {
  return new XacmlBooleanBagFunction('boolean-union', [
    ...args.map(arg => anyToConditionExpressionNode(arg, 'booleanBag')),
  ]);
}
export function integerAtLeastOneMemberOf(
  arg1: IntegerBagAttributeDesignator | XacmlIntegerBagFunction | number[],
  arg2: IntegerBagAttributeDesignator | XacmlIntegerBagFunction | number[],
) {
  return new XacmlBooleanFunction('integer-at-least-one-member-of', [
    anyToConditionExpressionNode(arg1, 'integerBag'),
    anyToConditionExpressionNode(arg2, 'integerBag'),
  ]);
}
export function integerSubset(
  arg1: IntegerBagAttributeDesignator | XacmlIntegerBagFunction | number[],
  arg2: IntegerBagAttributeDesignator | XacmlIntegerBagFunction | number[],
) {
  return new XacmlBooleanFunction('integer-subset', [
    anyToConditionExpressionNode(arg1, 'integerBag'),
    anyToConditionExpressionNode(arg2, 'integerBag'),
  ]);
}
export function integerSetEquals(
  arg1: IntegerBagAttributeDesignator | XacmlIntegerBagFunction | number[],
  arg2: IntegerBagAttributeDesignator | XacmlIntegerBagFunction | number[],
) {
  return new XacmlBooleanFunction('integer-set-equals', [
    anyToConditionExpressionNode(arg1, 'integerBag'),
    anyToConditionExpressionNode(arg2, 'integerBag'),
  ]);
}
export function integerIsIn(
  arg1: IntegerAttributeDesignator | XacmlIntegerFunction | number,
  arg2: IntegerBagAttributeDesignator | XacmlIntegerBagFunction | number[],
) {
  return new XacmlBooleanFunction('integer-is-in', [
    anyToConditionExpressionNode(arg1, 'integer'),
    anyToConditionExpressionNode(arg2, 'integerBag'),
  ]);
}
export function integerIntersection(
  arg1: IntegerBagAttributeDesignator | XacmlIntegerBagFunction | number[],
  arg2: IntegerBagAttributeDesignator | XacmlIntegerBagFunction | number[],
) {
  return new XacmlIntegerBagFunction('integer-intersection', [
    anyToConditionExpressionNode(arg1, 'integerBag'),
    anyToConditionExpressionNode(arg2, 'integerBag'),
  ]);
}
export function integerUnion(...args: (IntegerBagAttributeDesignator | XacmlIntegerBagFunction | number[])[]) {
  return new XacmlIntegerBagFunction('integer-union', [
    ...args.map(arg => anyToConditionExpressionNode(arg, 'integerBag')),
  ]);
}
export function doubleAtLeastOneMemberOf(
  arg1: DoubleBagAttributeDesignator | XacmlDoubleBagFunction | number[],
  arg2: DoubleBagAttributeDesignator | XacmlDoubleBagFunction | number[],
) {
  return new XacmlBooleanFunction('double-at-least-one-member-of', [
    anyToConditionExpressionNode(arg1, 'doubleBag'),
    anyToConditionExpressionNode(arg2, 'doubleBag'),
  ]);
}
export function doubleSubset(
  arg1: DoubleBagAttributeDesignator | XacmlDoubleBagFunction | number[],
  arg2: DoubleBagAttributeDesignator | XacmlDoubleBagFunction | number[],
) {
  return new XacmlBooleanFunction('double-subset', [
    anyToConditionExpressionNode(arg1, 'doubleBag'),
    anyToConditionExpressionNode(arg2, 'doubleBag'),
  ]);
}
export function doubleSetEquals(
  arg1: DoubleBagAttributeDesignator | XacmlDoubleBagFunction | number[],
  arg2: DoubleBagAttributeDesignator | XacmlDoubleBagFunction | number[],
) {
  return new XacmlBooleanFunction('double-set-equals', [
    anyToConditionExpressionNode(arg1, 'doubleBag'),
    anyToConditionExpressionNode(arg2, 'doubleBag'),
  ]);
}
export function doubleIsIn(
  arg1: DoubleAttributeDesignator | XacmlDoubleFunction | number,
  arg2: DoubleBagAttributeDesignator | XacmlDoubleBagFunction | number[],
) {
  return new XacmlBooleanFunction('double-is-in', [
    anyToConditionExpressionNode(arg1, 'double'),
    anyToConditionExpressionNode(arg2, 'doubleBag'),
  ]);
}
export function doubleIntersection(
  arg1: DoubleBagAttributeDesignator | XacmlDoubleBagFunction | number[],
  arg2: DoubleBagAttributeDesignator | XacmlDoubleBagFunction | number[],
) {
  return new XacmlDoubleBagFunction('double-intersection', [
    anyToConditionExpressionNode(arg1, 'doubleBag'),
    anyToConditionExpressionNode(arg2, 'doubleBag'),
  ]);
}
export function doubleUnion(...args: (DoubleBagAttributeDesignator | XacmlDoubleBagFunction | number[])[]) {
  return new XacmlDoubleBagFunction('double-union', [
    ...args.map(arg => anyToConditionExpressionNode(arg, 'doubleBag')),
  ]);
}
export function timeAtLeastOneMemberOf(
  arg1: TimeBagAttributeDesignator | XacmlTimeBagFunction | string[],
  arg2: TimeBagAttributeDesignator | XacmlTimeBagFunction | string[],
) {
  return new XacmlBooleanFunction('time-at-least-one-member-of', [
    anyToConditionExpressionNode(arg1, 'timeBag'),
    anyToConditionExpressionNode(arg2, 'timeBag'),
  ]);
}
export function timeSubset(
  arg1: TimeBagAttributeDesignator | XacmlTimeBagFunction | string[],
  arg2: TimeBagAttributeDesignator | XacmlTimeBagFunction | string[],
) {
  return new XacmlBooleanFunction('time-subset', [
    anyToConditionExpressionNode(arg1, 'timeBag'),
    anyToConditionExpressionNode(arg2, 'timeBag'),
  ]);
}
export function timeSetEquals(
  arg1: TimeBagAttributeDesignator | XacmlTimeBagFunction | string[],
  arg2: TimeBagAttributeDesignator | XacmlTimeBagFunction | string[],
) {
  return new XacmlBooleanFunction('time-set-equals', [
    anyToConditionExpressionNode(arg1, 'timeBag'),
    anyToConditionExpressionNode(arg2, 'timeBag'),
  ]);
}
export function timeIsIn(
  arg1: TimeAttributeDesignator | XacmlTimeFunction | string,
  arg2: TimeBagAttributeDesignator | XacmlTimeBagFunction | string[],
) {
  return new XacmlBooleanFunction('time-is-in', [
    anyToConditionExpressionNode(arg1, 'time'),
    anyToConditionExpressionNode(arg2, 'timeBag'),
  ]);
}
export function timeIntersection(
  arg1: TimeBagAttributeDesignator | XacmlTimeBagFunction | string[],
  arg2: TimeBagAttributeDesignator | XacmlTimeBagFunction | string[],
) {
  return new XacmlTimeBagFunction('time-intersection', [
    anyToConditionExpressionNode(arg1, 'timeBag'),
    anyToConditionExpressionNode(arg2, 'timeBag'),
  ]);
}
export function timeUnion(...args: (TimeBagAttributeDesignator | XacmlTimeBagFunction | string[])[]) {
  return new XacmlTimeBagFunction('time-union', [...args.map(arg => anyToConditionExpressionNode(arg, 'timeBag'))]);
}
export function dateAtLeastOneMemberOf(
  arg1: DateBagAttributeDesignator | XacmlDateBagFunction | Date[],
  arg2: DateBagAttributeDesignator | XacmlDateBagFunction | Date[],
) {
  return new XacmlBooleanFunction('date-at-least-one-member-of', [
    anyToConditionExpressionNode(arg1, 'dateBag'),
    anyToConditionExpressionNode(arg2, 'dateBag'),
  ]);
}
export function dateSubset(
  arg1: DateBagAttributeDesignator | XacmlDateBagFunction | Date[],
  arg2: DateBagAttributeDesignator | XacmlDateBagFunction | Date[],
) {
  return new XacmlBooleanFunction('date-subset', [
    anyToConditionExpressionNode(arg1, 'dateBag'),
    anyToConditionExpressionNode(arg2, 'dateBag'),
  ]);
}
export function dateSetEquals(
  arg1: DateBagAttributeDesignator | XacmlDateBagFunction | Date[],
  arg2: DateBagAttributeDesignator | XacmlDateBagFunction | Date[],
) {
  return new XacmlBooleanFunction('date-set-equals', [
    anyToConditionExpressionNode(arg1, 'dateBag'),
    anyToConditionExpressionNode(arg2, 'dateBag'),
  ]);
}
export function dateIsIn(
  arg1: DateAttributeDesignator | XacmlDateFunction | Date,
  arg2: DateBagAttributeDesignator | XacmlDateBagFunction | Date[],
) {
  return new XacmlBooleanFunction('date-is-in', [
    anyToConditionExpressionNode(arg1, 'date'),
    anyToConditionExpressionNode(arg2, 'dateBag'),
  ]);
}
export function dateIntersection(
  arg1: DateBagAttributeDesignator | XacmlDateBagFunction | Date[],
  arg2: DateBagAttributeDesignator | XacmlDateBagFunction | Date[],
) {
  return new XacmlDateBagFunction('date-intersection', [
    anyToConditionExpressionNode(arg1, 'dateBag'),
    anyToConditionExpressionNode(arg2, 'dateBag'),
  ]);
}
export function dateUnion(...args: (DateBagAttributeDesignator | XacmlDateBagFunction | Date[])[]) {
  return new XacmlDateBagFunction('date-union', [...args.map(arg => anyToConditionExpressionNode(arg, 'dateBag'))]);
}
export function dateTimeAtLeastOneMemberOf(
  arg1: DateTimeBagAttributeDesignator | XacmlDateTimeBagFunction | Date[],
  arg2: DateTimeBagAttributeDesignator | XacmlDateTimeBagFunction | Date[],
) {
  return new XacmlBooleanFunction('dateTime-at-least-one-member-of', [
    anyToConditionExpressionNode(arg1, 'dateTimeBag'),
    anyToConditionExpressionNode(arg2, 'dateTimeBag'),
  ]);
}
export function dateTimeSubset(
  arg1: DateTimeBagAttributeDesignator | XacmlDateTimeBagFunction | Date[],
  arg2: DateTimeBagAttributeDesignator | XacmlDateTimeBagFunction | Date[],
) {
  return new XacmlBooleanFunction('dateTime-subset', [
    anyToConditionExpressionNode(arg1, 'dateTimeBag'),
    anyToConditionExpressionNode(arg2, 'dateTimeBag'),
  ]);
}
export function dateTimeSetEquals(
  arg1: DateTimeBagAttributeDesignator | XacmlDateTimeBagFunction | Date[],
  arg2: DateTimeBagAttributeDesignator | XacmlDateTimeBagFunction | Date[],
) {
  return new XacmlBooleanFunction('dateTime-set-equals', [
    anyToConditionExpressionNode(arg1, 'dateTimeBag'),
    anyToConditionExpressionNode(arg2, 'dateTimeBag'),
  ]);
}
export function dateTimeIsIn(
  arg1: DateTimeAttributeDesignator | XacmlDateTimeFunction | Date,
  arg2: DateTimeBagAttributeDesignator | XacmlDateTimeBagFunction | Date[],
) {
  return new XacmlBooleanFunction('dateTime-is-in', [
    anyToConditionExpressionNode(arg1, 'dateTime'),
    anyToConditionExpressionNode(arg2, 'dateTimeBag'),
  ]);
}
export function dateTimeIntersection(
  arg1: DateTimeBagAttributeDesignator | XacmlDateTimeBagFunction | Date[],
  arg2: DateTimeBagAttributeDesignator | XacmlDateTimeBagFunction | Date[],
) {
  return new XacmlDateTimeBagFunction('dateTime-intersection', [
    anyToConditionExpressionNode(arg1, 'dateTimeBag'),
    anyToConditionExpressionNode(arg2, 'dateTimeBag'),
  ]);
}
export function dateTimeUnion(...args: (DateTimeBagAttributeDesignator | XacmlDateTimeBagFunction | Date[])[]) {
  return new XacmlDateTimeBagFunction('dateTime-union', [
    ...args.map(arg => anyToConditionExpressionNode(arg, 'dateTimeBag')),
  ]);
}
export function ipAddressEndpointMatch(
  arg1: StringAttributeDesignator | XacmlStringFunction | string,
  arg2: IpAddressAttributeDesignator | XacmlIpAddressFunction | string,
) {
  return new XacmlBooleanFunction('ipAddress-endpoint-match', [
    anyToConditionExpressionNode(arg1, 'string'),
    anyToConditionExpressionNode(arg2, 'ipAddress'),
  ]);
}
export function ipAddressRegexpMatch(
  arg1: StringAttributeDesignator | XacmlStringFunction | string,
  arg2: IpAddressAttributeDesignator | XacmlIpAddressFunction | string,
) {
  return new XacmlBooleanFunction('ipAddress-regexp-match', [
    anyToConditionExpressionNode(arg1, 'string'),
    anyToConditionExpressionNode(arg2, 'ipAddress'),
  ]);
}
