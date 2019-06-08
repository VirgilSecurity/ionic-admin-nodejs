import { DecisionRequestStringAttribute } from './data-types';

export const Attributes = {
  resource: {
    classification: new DecisionRequestStringAttribute('resource', 'classification'),
  },
  subject: {
    group: new DecisionRequestStringAttribute('subject', 'group'),
  },
};
