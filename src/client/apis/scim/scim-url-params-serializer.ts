import { ResourceQueryParams } from './resources';
import { urlParamsSerializer } from '../../url-params-serializer';

export function scimUrlParamsSerializer<TFilterParams>(params: ResourceQueryParams<TFilterParams>) {
  const { attributes, ...rest } = params;
  const normalizedParams: any = { ...rest };
  if (attributes) {
    // The `attributes` parameter must be specified in a single string
    // parameter as a comma-separated list. For the rest of parameters
    // "repeat" array format must be used.
    normalizedParams.attributes = attributes.join(',');
  }

  return urlParamsSerializer(normalizedParams);
}
