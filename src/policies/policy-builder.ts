import { XacmlBooleanFunction } from './xacml/xacml-function';

interface JsonPolicyBuilder {
  toJson(): any;
}

interface RuleBuilder {
  allowIf(condition: XacmlBooleanFunction): MultipleRuleBuilder;
  denyIf(condition: XacmlBooleanFunction): MultipleRuleBuilder;
  alwaysAllow(): JsonPolicyBuilder;
  alwaysDeny(): JsonPolicyBuilder;
}

interface MultipleRuleBuilder {
  allowIf(condition: XacmlBooleanFunction): MultipleRuleBuilder;
  denyIf(condition: XacmlBooleanFunction): MultipleRuleBuilder;
  allowOtherwise(): JsonPolicyBuilder;
  denyOtherwise(): JsonPolicyBuilder;
}

interface ConditionBuilder {
  appliesTo(condition: XacmlBooleanFunction): RuleBuilder;
  appliesToAllData(): RuleBuilder;
}

class PolicyBuilder implements ConditionBuilder, RuleBuilder, MultipleRuleBuilder, JsonPolicyBuilder {
  readonly policy: Policy;

  constructor(policy: Policy) {
    this.policy = policy;
  }

  appliesToAllData(): RuleBuilder {
    this.policy.setDescription('All data.');
    return this;
  }

  appliesTo(condition: XacmlBooleanFunction): RuleBuilder {
    const target = new Target(condition);
    this.policy.setTarget(target);
    this.policy.setDescription(condition.getDescription());
    return this;
  }

  alwaysAllow(): JsonPolicyBuilder {
    const rule = new Rule();
    rule.setEffect(Rule.Allow);
    rule.setDescription('Always allow.');
    this.policy.addRule(rule);
    return this;
  }

  alwaysDeny(): JsonPolicyBuilder {
    const rule = new Rule();
    rule.setEffect(Rule.Deny);
    rule.setDescription('Always deny.');
    this.policy.addRule(rule);
    return this;
  }

  allowIf(condition: XacmlBooleanFunction): MultipleRuleBuilder {
    const rule = new Rule();
    rule.setEffect(Rule.Allow);
    rule.setCondition(condition);
    rule.setDescription(condition.getDescription());
    this.policy.addRule(rule);
    return this;
  }

  denyIf(condition: XacmlBooleanFunction): MultipleRuleBuilder {
    const rule = new Rule();
    rule.setEffect(Rule.Deny);
    rule.setCondition(condition);
    rule.setDescription(condition.getDescription());
    this.policy.addRule(rule);
    return this;
  }

  allowOtherwise(): JsonPolicyBuilder {
    const rule = new Rule();
    rule.setEffect(Rule.Allow);
    rule.setDescription('Allow otherwise.');
    this.policy.addRule(rule);
    return this;
  }

  denyOtherwise(): JsonPolicyBuilder {
    const rule = new Rule();
    rule.setEffect(Rule.Deny);
    rule.setDescription('Deny otherwise.');
    this.policy.addRule(rule);
    return this;
  }

  toJson(): any {
    return this.policy.toJson();
  }
}

class Policy {
  private readonly _data: any;
  private _target?: Target;
  private _rules?: Rule[];

  constructor({
    policyId,
    ruleCombiningAlgId,
    enabled,
  }: {
    policyId: string;
    ruleCombiningAlgId?: string;
    enabled?: boolean;
  }) {
    this._data = {
      policyId,
      ruleCombiningAlgId,
      enabled,
    };
  }

  setDescription(description: string) {
    this._data.description = description;
  }

  setTarget(target: Target) {
    this._target = target;
  }

  addRule(rule: Rule) {
    const rules = this._rules || (this._rules = []);
    rules.push(rule);
  }

  toJson() {
    const result = {
      ...this._data,
    };

    if (this._target) {
      result.target = this._target.toJson();
    }

    if (this._rules) {
      result.rules = this._rules.map(r => r.toJson());
    }

    return result;
  }
}

class Target {
  private readonly _condition: XacmlBooleanFunction;

  constructor(condition: XacmlBooleanFunction) {
    this._condition = condition;
  }

  toJson() {
    return { condition: this._condition.toJson() };
  }
}

class Rule {
  static get Allow() {
    return 'Permit';
  }

  static get Deny() {
    return 'Deny';
  }

  private effect: string = '';
  private description: string = '';
  private condition?: XacmlBooleanFunction;

  setEffect(effect: string) {
    this.effect = effect;
  }

  setDescription(description: string) {
    this.description = description;
  }

  setCondition(condition: XacmlBooleanFunction) {
    this.condition = condition;
  }

  toJson() {
    const result: any = {
      effect: this.effect,
      description: this.description,
    };
    if (this.condition) {
      result.condition = this.condition.toJson();
    }
    return result;
  }
}

export default function createPolicy(data: {
  policyId: string;
  ruleCombiningAlgId?: string;
  enabled?: boolean;
}): ConditionBuilder {
  return new PolicyBuilder(new Policy(data));
}
