import { scimUrlParamsSerializer } from '../../../src/client/apis/scim/scim-url-params-serializer';
import { FilterParams } from '../../../src/client/url-params-serializer';

interface MockFilterParams extends FilterParams {
  foo: number;
  bar: string;
  baz: string | string[];
}

test('attributes are comma separated', () => {
  const queryString = scimUrlParamsSerializer<MockFilterParams>({
    attributes: ['bar', 'baz'],
  });

  expect(queryString).toEqual('attributes=bar%2Cbaz');
});
