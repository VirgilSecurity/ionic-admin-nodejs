import {
  StringAttributeDesignator,
  XacmlStringFunction,
  XacmlBooleanFunction,
  AttributeValue,
  ConditionExpressionNode,
} from './data-types';

export function stringEqual(
  a: StringAttributeDesignator | XacmlStringFunction | string,
  b: StringAttributeDesignator | XacmlStringFunction | string,
): XacmlBooleanFunction {
  let aTreeItem = anyToTreeItem(a);
  let bTreeItem = anyToTreeItem(b);
  return new XacmlBooleanFunction('string-equal', [aTreeItem, bTreeItem]);
}

function anyToTreeItem(x: any) {
  if (typeof x === 'string') {
    return new AttributeValue<string>('string', x);
  }

  if (typeof x === 'boolean') {
    return new AttributeValue<boolean>('boolean', x);
  }

  if (x instanceof ConditionExpressionNode) {
    return x;
  }

  throw new TypeError(`Unsupported argument type: ${typeof x}`);
}
