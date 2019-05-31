import { buildUrlParams, ResourceFilterParams } from '../../src/client/url-params-builder';

interface MockFilterParams extends ResourceFilterParams {
  foo: number;
  bar: string;
  baz: string | string[];
}

test('produces query string', () => {
  const params = buildUrlParams<MockFilterParams>({
    skip: 0,
    limit: 1,
  });

  expect(params.stringify()).toEqual('skip=0&limit=1');
});

test('attributes are comma separated', () => {
  const params = buildUrlParams<MockFilterParams>({
    attributes: ['bar', 'baz'],
  });

  expect(params.stringify()).toEqual('attributes=bar%2Cbaz');
});

test('flattens filter queries', () => {
  const params = buildUrlParams<MockFilterParams>({
    filter: {
      foo: 2,
      bar: 'hello',
    },
  });

  expect(params.stringify()).toEqual('foo=2&bar=hello');
});

test('appends filter operators to parameter names', () => {
  const params = buildUrlParams<MockFilterParams>({
    filter: {
      foo: { __gte: 1 },
    },
  });

  expect(params.stringify()).toEqual('foo__gte=1');
});

test('can specify more than one filter for the same parameter', () => {
  const params = buildUrlParams<MockFilterParams>({
    filter: {
      foo: { __gte: 1, __lte: 100 },
    },
  });

  expect(params.stringify()).toEqual('foo__gte=1&foo__lte=100');
});

test('uses repeat array format for filter expressions', () => {
  const params = buildUrlParams<MockFilterParams>({
    filter: {
      baz: { __all: ['a', 'b', 'c'] },
    },
  });

  expect(params.stringify()).toEqual('baz__all=a&baz__all=b&baz__all=c');
});

test('can specify OR matching for multiple params', () => {
  const params = buildUrlParams<MockFilterParams>({
    filter: {
      bar: { __startswith: 'ping' },
      baz: { __any: ['pong'] },
      or: true,
    },
  });

  expect(params.stringify()).toEqual('bar__startswith=ping&baz__any=pong&or=true');
});

test('can negate filter with __ne', () => {
  const params = buildUrlParams<MockFilterParams>({
    filter: {
      bar: { __contains: { __ne: 'that' } },
    },
  });

  expect(params.stringify()).toEqual('bar__contains__ne=that');
});

test('can use __ne as filter by itself', () => {
  const params = buildUrlParams<MockFilterParams>({
    filter: {
      foo: { __ne: 99 },
    },
  });

  expect(params.stringify()).toEqual('foo__ne=99');
});
