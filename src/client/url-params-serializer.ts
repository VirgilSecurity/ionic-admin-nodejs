import qs from 'qs';
import { isPlainObject } from '../utils';

export interface FilterParams {
  or?: boolean;
}

export interface QueryParams<TFilterParams extends FilterParams> {
  startIndex?: number;
  count?: number;
  skip?: number;
  limit?: number;
  filter?: FilterDescriptor<TFilterParams>;
}

export type FilterDescriptor<T> = { [P in keyof T]?: T[P] | FilterExpression<T, P> };

export interface FilterExpression<T, P extends keyof T> {
  __contains?: NegatedFilterExpression<T[P]> | T[P];
  __startswith?: NegatedFilterExpression<T[P]> | T[P];
  __gte?: NegatedFilterExpression<T[P]> | T[P];
  __lte?: NegatedFilterExpression<T[P]> | T[P];
  __ne?: T[P];
  __empty?: boolean;
  __any?: NegatedFilterExpression<T[P]> | T[P];
  __all?: NegatedFilterExpression<T[P]> | T[P];
}

export interface NegatedFilterExpression<T> {
  __ne: T;
}

function transformFilter<TFilterParams extends FilterParams>(
  filter: FilterDescriptor<TFilterParams>,
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

function transformUrlParams<TFilterParams extends FilterParams>(options: QueryParams<TFilterParams>) {
  const { filter, ...rest } = options;
  const result: { [key: string]: any } = {
    ...rest,
  };

  if (filter) {
    const transformedFilter = transformFilter(filter);
    for (const [name, value] of Object.entries(transformedFilter)) {
      if (typeof value !== 'undefined') {
        result[name] = value;
      }
    }
  }

  return result;
}

export function urlParamsSerializer<TQueryParams extends QueryParams<any>>(params: TQueryParams) {
  const ionicParams = transformUrlParams(params);
  return qs.stringify(ionicParams, { arrayFormat: 'repeat' });
}
