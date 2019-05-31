import qs from 'qs';
import { isPlainObject } from '../utils';

export interface ResourceFilterParams {
  or?: boolean;
}

export interface QueryParams<TFilterParams extends ResourceFilterParams> {
  startIndex?: number;
  count?: number;
  skip?: number;
  limit?: number;
  attributes?: string[];
  filter?: FilterQuery<TFilterParams>;
}

type FilterQuery<T> = { [P in keyof T]?: T[P] | FilterExpression<T, P> };

interface FilterExpression<T, P extends keyof T> {
  __contains?: NegatedFilterExpression<T[P]> | T[P];
  __startswith?: NegatedFilterExpression<T[P]> | T[P];
  __gte?: NegatedFilterExpression<T[P]> | T[P];
  __lte?: NegatedFilterExpression<T[P]> | T[P];
  __ne?: T[P];
  __empty?: boolean;
  __any?: NegatedFilterExpression<T[P]> | T[P];
  __all?: NegatedFilterExpression<T[P]> | T[P];
}

interface NegatedFilterExpression<T> {
  __ne: T;
}

function transformFilter<TFilterParams extends ResourceFilterParams>(
  filter: FilterQuery<TFilterParams>,
): { or?: boolean; [key: string]: any } {
  const { or, ...filterAttrs } = filter;
  const normalizedParams: { or?: boolean; [key: string]: any } = {};
  for (const [attributeName, valueOrExpression] of Object.entries(filterAttrs)) {
    if (isPlainObject(valueOrExpression)) {
      const expression: FilterExpression<TFilterParams, keyof TFilterParams> = valueOrExpression;
      for (let [operatorName, value] of Object.entries(expression)) {
        let actualValue;
        if (isPlainObject(value) && '__ne' in value) {
          const negatedExpression = value as NegatedFilterExpression<TFilterParams>;
          operatorName += '__ne';
          actualValue = negatedExpression.__ne;
        } else {
          actualValue = value;
        }
        normalizedParams[`${attributeName}${operatorName}`] = actualValue;
      }
    } else {
      const value = valueOrExpression;
      normalizedParams[attributeName] = value;
    }
  }

  if (or) {
    normalizedParams.or = true;
  }

  return normalizedParams;
}

export class IonicUrlParams {
  readonly params: { [key: string]: any };
  constructor(params: { [key: string]: any }) {
    this.params = params;
  }

  stringify() {
    return qs.stringify(this.params, { arrayFormat: 'repeat' });
  }
}

export function buildUrlParams<TFilterParams extends ResourceFilterParams>(options: QueryParams<TFilterParams>) {
  const { startIndex, count, skip, limit, attributes, filter } = options;
  const result: { [key: string]: any } = {
    startIndex,
    count,
    skip,
    limit,
    // The attributes are specified in a single string parameter as a comma-separated list
    attributes: attributes && attributes.join(','),
  };

  if (filter) {
    const transformedFilter = transformFilter(filter);
    for (const [name, value] of Object.entries(transformedFilter)) {
      if (typeof value !== 'undefined') {
        result[name] = value;
      }
    }
  }

  return new IonicUrlParams(result);
}

export function paramsSerializer(params: IonicUrlParams) {
  if (params instanceof IonicUrlParams === false) {
    throw new TypeError(
      'Invalid URL parameters type. Expected an instance of "IonicUrlParams". Use "buildUrlParams" to create an instance.',
    );
  }

  return params.stringify();
}
