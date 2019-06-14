import { ConditionExpressionNode } from './common';

export class AttributeValue extends ConditionExpressionNode {
  dataType: string;
  value: any;

  constructor(dataType: string, value: any) {
    super();
    this.dataType = dataType;
    this.value = value;
  }

  toJson() {
    return {
      dataType: this.dataType.replace(/Bag$/, ''),
      value: this.value,
    };
  }

  getDescription() {
    return this.value.toString();
  }
}
