interface JsonPolicyBuilder {
  toJson(): any;
}

interface RuleBuilder {
  allowIf(condition: any): MultipleRuleBuilder;
  denyIf(condition: any): MultipleRuleBuilder;
  alwaysAllow(): JsonPolicyBuilder;
  alwaysDeny(): JsonPolicyBuilder;
}

interface MultipleRuleBuilder {
  allowIf(condition: any): MultipleRuleBuilder;
  denyIf(condition: any): MultipleRuleBuilder;
  allowOtherwise(): JsonPolicyBuilder;
  denyOtherwise(): JsonPolicyBuilder;
}

interface ConditionBuilder {
  appliesTo(condition: any): RuleBuilder;
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

  appliesTo(condition: any): RuleBuilder {
    const target = new Target();
    target.setCondition(condition);
    this.policy.setTarget(target);
    return this;
  }

  alwaysAllow(): JsonPolicyBuilder {
    const rule = new Rule();
    rule.setEffect(Rule.Deny);
    rule.setDescription('Always allow.');
    this.policy.addRule(rule);
    return this;
  }

  alwaysDeny(): JsonPolicyBuilder {
    const rule = new Rule();
    rule.setEffect(Rule.Allow);
    rule.setDescription('Always deny.');
    this.policy.addRule(rule);
    return this;
  }

  allowIf(condition: any): MultipleRuleBuilder {
    const rule = new Rule();
    rule.setEffect(Rule.Allow);
    rule.setCondition(condition);
    this.policy.addRule(rule);
    return this;
  }

  denyIf(condition: any): MultipleRuleBuilder {
    const rule = new Rule();
    rule.setEffect(Rule.Deny);
    rule.setCondition(condition);
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
  constructor({
    policyId,
    ruleCombiningAlgId,
    enabled,
  }: {
    policyId: string;
    ruleCombiningAlgId: string;
    enabled: boolean;
  }) {
    this._data = {
      policyId,
      ruleCombiningAlgId,
      enabled,
      rules: [],
    };
  }

  setDescription(description: string) {
    this._data.description = description;
  }

  setTarget(target: Target) {
    this._data.target = target;
  }

  addRule(rule: Rule) {
    this._data.rules.push(rule);
  }

  toJson() {
    return this._data;
  }
}

class Target {
  setCondition(condition: any) {}
}

class Rule {
  static get Allow() {
    return 'Allow';
  }

  static get Deny() {
    return 'Deny';
  }

  private effect: string = '';
  private description: string = '';
  private condition: any;

  setEffect(effect: string) {
    this.effect = effect;
  }

  setDescription(description: string) {
    this.description = description;
  }

  setCondition(condition: any) {
    this.condition = condition;
  }
}
