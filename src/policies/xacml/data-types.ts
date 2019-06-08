export abstract class ExpressionTreeItem {
  abstract toJson(): object;
}

export class DecisionRequestAttribute extends ExpressionTreeItem {
  category: string;
  id: string;

  constructor(category: string, id: string) {
    super();
    this.category = category;
    this.id = id;
  }

  toJson() {
    return {
      category: this.category,
      id: this.id,
    };
  }
}

export class DecisionRequestStringAttribute extends DecisionRequestAttribute {}
export class DecisionRequestBooleanAttribute extends DecisionRequestAttribute {}

export class LiteralValue<T> extends ExpressionTreeItem {
  dataType: string;
  value: T;

  constructor(dataType: string, value: T) {
    super();
    this.dataType = dataType;
    this.value = value;
  }

  toJson() {
    return {
      dataType: this.dataType,
      value: [this.value],
    };
  }
}

export abstract class XacmlExpression extends ExpressionTreeItem {
  functionId: string;
  args: ExpressionTreeItem[];

  constructor(functionId: string, args: ExpressionTreeItem[]) {
    super();
    this.functionId = functionId;
    this.args = args;
  }

  toJson() {
    return {
      functionId: this.functionId,
      args: this.args.map(arg => arg.toJson()),
    };
  }
}

export class XacmlStringExpression extends XacmlExpression {}

export class XacmlBooleanExpression extends XacmlExpression {}
