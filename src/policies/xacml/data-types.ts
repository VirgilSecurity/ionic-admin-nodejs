export abstract class ConditionExpressionNode {
  abstract toJson(): object;
}

export class AttributeDesignator extends ConditionExpressionNode {
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

export class StringAttributeDesignator extends AttributeDesignator {}
export class StringBagAttributeDesignator extends AttributeDesignator {}
export class BooleanAttributeDesignator extends AttributeDesignator {}
export class DateAttributeDesignator extends AttributeDesignator {}
export class DateTimeAttributeDesignator extends AttributeDesignator {}
export class TimeAttributeDesignator extends AttributeDesignator {}
export class DoubleAttributeDesignator extends AttributeDesignator {}
export class IntegerAttributeDesignator extends AttributeDesignator {}
export class IpAddressAtrtributeDesignator extends AttributeDesignator {}

export class AttributeValue<T> extends ConditionExpressionNode {
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
      value: this.value,
    };
  }
}

export abstract class XacmlFunction extends ConditionExpressionNode {
  functionId: string;
  args: ConditionExpressionNode[];

  constructor(functionId: string, args: ConditionExpressionNode[]) {
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

export class XacmlStringFunction extends XacmlFunction {}
export class XacmlStringBagFunction extends XacmlFunction {}
export class XacmlBooleanFunction extends XacmlFunction {}
export class XacmlBooleanBagFunction extends XacmlFunction {}
export class XacmlIntegerFunction extends XacmlFunction {}
export class XacmlIntegerBagFunction extends XacmlFunction {}
export class XacmlDoubleFunction extends XacmlFunction {}
export class XacmlDoubleBagFunction extends XacmlFunction {}
export class XacmlTimeFunction extends XacmlFunction {}
export class XacmlTimeBagFunction extends XacmlFunction {}
export class XacmlDateFunction extends XacmlFunction {}
export class XacmlDateBagFunction extends XacmlFunction {}
export class XacmlDateTimeFunction extends XacmlFunction {}
export class XacmlDateTimeBagFunction extends XacmlFunction {}
export class XacmlIpAddressFunction extends XacmlFunction {}
export class XacmlIpAddressBagFunction extends XacmlFunction {}
