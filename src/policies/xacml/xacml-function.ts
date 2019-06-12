import { ConditionExpressionNode } from './common';

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

  getDescription() {
    if (this.args.length === 1) {
      return `${this.functionId} ${this.args[0].getDescription()}`;
    }
    return this.args.map(arg => arg.getDescription()).join(` ${this.functionId} `);
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
export class XacmlDayTimeDurationFunction extends XacmlFunction {}
export class XacmlYearMonthDurationFunction extends XacmlFunction {}
