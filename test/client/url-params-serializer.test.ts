import { urlParamsSerializer, FilterParams, QueryParams } from '../../src/client/url-params-serializer';

interface MockFilterParams extends FilterParams {
  foo: number;
  bar: string;
  baz: string | string[];
}

test('produces query string', () => {
  const queryString = urlParamsSerializer<QueryParams<MockFilterParams>>({
    skip: 0,
    limit: 1,
  });

  expect(queryString).toEqual('skip=0&limit=1');
});

test('flattens filter queries', () => {
  const queryString = urlParamsSerializer<QueryParams<MockFilterParams>>({
    filter: {
      foo: 2,
      bar: 'hello',
    },
  });

  expect(queryString).toEqual('foo=2&bar=hello');
});

test('appends filter operators to parameter names', () => {
  const queryString = urlParamsSerializer<QueryParams<MockFilterParams>>({
    filter: {
      foo: { __gte: 1 },
    },
  });

  expect(queryString).toEqual('foo__gte=1');
});

test('can specify more than one filter for the same parameter', () => {
  const queryString = urlParamsSerializer<QueryParams<MockFilterParams>>({
    filter: {
      foo: { __gte: 1, __lte: 100 },
    },
  });

  expect(queryString).toEqual('foo__gte=1&foo__lte=100');
});

test('uses repeat array format for filter expressions', () => {
  const queryString = urlParamsSerializer<QueryParams<MockFilterParams>>({
    filter: {
      baz: { __all: ['a', 'b', 'c'] },
    },
  });

  expect(queryString).toEqual('baz__all=a&baz__all=b&baz__all=c');
});

test('can specify OR matching for multiple params', () => {
  const queryString = urlParamsSerializer<QueryParams<MockFilterParams>>({
    filter: {
      bar: { __startswith: 'ping' },
      baz: { __any: ['pong'] },
      or: true,
    },
  });

  expect(queryString).toEqual('bar__startswith=ping&baz__any=pong&or=true');
});

test('can negate filter with __ne', () => {
  const queryString = urlParamsSerializer<QueryParams<MockFilterParams>>({
    filter: {
      bar: { __contains: { __ne: 'that' } },
    },
  });

  expect(queryString).toEqual('bar__contains__ne=that');
});

test('can use __ne as filter by itself', () => {
  const queryString = urlParamsSerializer<QueryParams<MockFilterParams>>({
    filter: {
      foo: { __ne: 99 },
    },
  });

  expect(queryString).toEqual('foo__ne=99');
});
