export abstract class ConditionExpressionNode {
  abstract toJson(): object;
  abstract getDescription(): string;
}
