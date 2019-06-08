import {
  DecisionRequestStringAttribute,
  XacmlStringExpression,
  XacmlBooleanExpression,
  LiteralValue,
  ExpressionTreeItem,
} from './data-types';

export function stringEqual(
  a: DecisionRequestStringAttribute | XacmlStringExpression | string,
  b: DecisionRequestStringAttribute | XacmlStringExpression | string,
): XacmlBooleanExpression {
  let aTreeItem = anyToTreeItem(a);
  let bTreeItem = anyToTreeItem(b);
  return new XacmlBooleanExpression('string-equal', [aTreeItem, bTreeItem]);
}

function anyToTreeItem(x: any) {
  if (typeof x === 'string') {
    return new LiteralValue<string>('string', x);
  }

  if (typeof x === 'boolean') {
    return new LiteralValue<boolean>('boolean', x);
  }

  if (x instanceof ExpressionTreeItem) {
    return x;
  }

  throw new TypeError(`Unsupported argument type: ${typeof x}`);
}
