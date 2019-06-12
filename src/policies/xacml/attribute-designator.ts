import { ConditionExpressionNode } from './common';

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

  getDescription() {
    return this.id;
  }
}

export class StringAttributeDesignator extends AttributeDesignator {}
export class StringBagAttributeDesignator extends AttributeDesignator {}
export class BooleanAttributeDesignator extends AttributeDesignator {}
export class BooleanBagAttributeDesignator extends AttributeDesignator {}
export class DateAttributeDesignator extends AttributeDesignator {}
export class DateBagAttributeDesignator extends AttributeDesignator {}
export class DateTimeAttributeDesignator extends AttributeDesignator {}
export class DateTimeBagAttributeDesignator extends AttributeDesignator {}
export class TimeAttributeDesignator extends AttributeDesignator {}
export class TimeBagAttributeDesignator extends AttributeDesignator {}
export class DoubleAttributeDesignator extends AttributeDesignator {}
export class DoubleBagAttributeDesignator extends AttributeDesignator {}
export class IntegerAttributeDesignator extends AttributeDesignator {}
export class IntegerBagAttributeDesignator extends AttributeDesignator {}
export class IpAddressAttributeDesignator extends AttributeDesignator {}
export class IpAddressBagAttributeDesignator extends AttributeDesignator {}
