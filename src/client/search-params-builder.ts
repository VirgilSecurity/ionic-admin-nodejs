import qs from 'qs';

export interface QueryParams<T> {
  skip?: number;
  limit?: number;
  attributes?: (keyof T)[];
  searchParams?: FilterQuery<T> & { or?: boolean };
}

export type FilterQuery<T> = { [P in keyof T]?: T[P] | FilterExpression<T, P> };

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

interface NegatedFilterExpression<T> {
  __ne: T;
}

type FilterOperatorNames = (keyof FilterExpression<any, any>)[];

const FILTER_OPERATORS: FilterOperatorNames = [
  '__contains',
  '__startswith',
  '__gte',
  '__lte',
  '__ne',
  '__empty',
  '__any',
  '__all',
];

function pick<T, K extends keyof T>(o: T, names: K[]): Pick<T, K> {
  return names.reduce(
    (result, cur) => {
      result[cur] = o[cur];
      return result;
    },
    {} as any,
  );
}

function isPlainObject(obj: any): obj is {} {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

export default function createSearchParamsBuilder<TResource, K extends keyof FilterQuery<TResource>>(
  parameterNames: K[],
  filterOperators: FilterOperatorNames = FILTER_OPERATORS,
): (options: QueryParams<TResource>) => string {
  return function buildUrlSearchParams(options: QueryParams<TResource>) {
    const { skip, limit, attributes, searchParams } = options;
    const { or, ...passedParams } = searchParams || { or: undefined };

    const actualParams = pick(passedParams as FilterQuery<TResource>, parameterNames);

    const normalizedParams: { or?: boolean; [key: string]: any } = {};
    for (const [attributeName, valueOrExpression] of Object.entries(actualParams)) {
      if (isPlainObject(valueOrExpression)) {
        const expression: FilterExpression<TResource, keyof TResource> = valueOrExpression;
        const actualExpression = pick(expression, filterOperators);
        for (let [operatorName, value] of Object.entries(actualExpression)) {
          let actualValue;
          if (isPlainObject(value)) {
            const negatedExpression = (value as unknown) as NegatedFilterExpression<TResource>;
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

    const result: { [key: string]: any } = {
      skip,
      limit,
      attributes: attributes && attributes.join(','),
    };

    for (const [name, value] of Object.entries(normalizedParams)) {
      if (typeof value !== 'undefined') {
        result[name] = value;
      }
    }

    return qs.stringify(result, { arrayFormat: 'repeat' });
  };
}
