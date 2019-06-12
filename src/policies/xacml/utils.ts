import { ConditionExpressionNode } from './common';
import { AttributeValue } from './attribute-value';

type XacmlDataType =
  | 'string'
  | 'stringBag'
  | 'boolean'
  | 'booleanBag'
  | 'integer'
  | 'integerBag'
  | 'double'
  | 'doubleBag'
  | 'time'
  | 'timeBag'
  | 'date'
  | 'dateBag'
  | 'dateTime'
  | 'dateTimeBag'
  | 'ipAddress'
  | 'ipAddressBag'
  | 'dayTimeDuration'
  | 'yearMonthDuration';

const primitiveToAttributeValue = (condition: (x: any) => boolean) => (x: any, dataType: XacmlDataType) => {
  if (condition(x)) {
    return new AttributeValue(dataType, x);
  }
  throw new TypeError(`Unexpected argument type: ${typeof x}. Expected ${dataType}`);
};

const argTypeToTransformFunction = {
  string: primitiveToAttributeValue(x => typeof x === 'string'),
  stringBag: primitiveToAttributeValue(x => isArrayOfType(x, 'string')),
  boolean: primitiveToAttributeValue(x => typeof x === 'boolean'),
  booleanBag: primitiveToAttributeValue(x => isArrayOfType(x, 'boolean')),
  integer: primitiveToAttributeValue(x => Number.isInteger(x)),
  integerBag: primitiveToAttributeValue(x => isArrayOf(x, it => Number.isInteger(it))),
  double: primitiveToAttributeValue(x => typeof x === 'number'),
  doubleBag: primitiveToAttributeValue(x => isArrayOfType(x, 'number')),
  time: primitiveToAttributeValue(x => typeof x === 'string'),
  timeBag: primitiveToAttributeValue(x => isArrayOfType(x, 'string')),
  date: primitiveToAttributeValue(x => x instanceof Date),
  dateBag: primitiveToAttributeValue(x => isArrayOf(x, it => it instanceof Date)),
  dateTime: primitiveToAttributeValue(x => x instanceof Date),
  dateTimeBag: primitiveToAttributeValue(x => isArrayOf(x, it => it instanceof Date)),
  ipAddress: primitiveToAttributeValue(x => typeof x === 'string'),
  ipAddressBag: primitiveToAttributeValue(x => isArrayOfType(x, 'string')),
  dayTimeDuration: primitiveToAttributeValue(x => typeof x === 'string'),
  yearMonthDuration: primitiveToAttributeValue(x => typeof x === 'string'),
};

export function anyToConditionExpressionNode(x: any, dataType: XacmlDataType) {
  if (x instanceof ConditionExpressionNode) {
    return x;
  }

  const transform = argTypeToTransformFunction[dataType];
  if (!transform) {
    throw new TypeError(`Unsupported argument data type: ${dataType}`);
  }

  return transform(x, dataType);
}

function isArrayOf(a: any, predicate: (it: any) => boolean) {
  return Array.isArray(a) && a.every(predicate);
}

function isArrayOfType(a: any, dataType: string) {
  return isArrayOf(a, it => typeof it === dataType);
}
