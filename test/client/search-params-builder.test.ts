import createSearchParamsBuilder, { FilterQuery } from '../../src/client/search-params-builder';

interface MockResource {
  foo: number;
  bar: string;
  baz: string[];
}

const buildMockResourceSearchParams = createSearchParamsBuilder<MockResource, keyof FilterQuery<MockResource>>([
  'foo',
  'bar',
  'baz',
]);

test('produces query string', () => {
  const queryString = buildMockResourceSearchParams({
    skip: 0,
    limit: 1,
  });

  expect(queryString).toEqual('skip=0&limit=1');
});

test('attributes are comma separated', () => {
  const queryString = buildMockResourceSearchParams({
    attributes: ['bar', 'baz'],
  });

  expect(queryString).toEqual('attributes=bar%2Cbaz');
});

test('flattens search queries', () => {
  const queryString = buildMockResourceSearchParams({
    searchParams: {
      foo: 2,
      bar: 'hello',
    },
  });

  expect(queryString).toEqual('foo=2&bar=hello');
});

test('appends filter operators to parameter names', () => {
  const qs = buildMockResourceSearchParams({
    searchParams: {
      foo: { __gte: 1 },
    },
  });

  expect(qs).toEqual('foo__gte=1');
});

test('can specify more than one filter for the same parameter', () => {
  const qs = buildMockResourceSearchParams({
    searchParams: {
      foo: { __gte: 1, __lte: 100 },
    },
  });

  expect(qs).toEqual('foo__gte=1&foo__lte=100');
});

test('uses repeat array format for filter expressions', () => {
  const qs = buildMockResourceSearchParams({
    searchParams: {
      baz: { __all: ['a', 'b', 'c'] },
    },
  });

  expect(qs).toEqual('baz__all=a&baz__all=b&baz__all=c');
});

test('can specify OR matching for multiple params', () => {
  const qs = buildMockResourceSearchParams({
    searchParams: {
      bar: { __startswith: 'ping' },
      baz: { __any: ['pong'] },
      or: true,
    },
  });

  expect(qs).toEqual('bar__startswith=ping&baz__any=pong&or=true');
});

test('can negate filter with __ne', () => {
  const qs = buildMockResourceSearchParams({
    searchParams: {
      bar: { __contains: { __ne: 'that' } },
    },
  });

  expect(qs).toEqual('bar__contains__ne=that');
});

test('can use __ne as filter by itself', () => {
  const qs = buildMockResourceSearchParams({
    searchParams: {
      foo: { __ne: 99 },
    },
  });

  expect(qs).toEqual('foo__ne=99');
});
