import RequestExecutor from '../../request-executor';
import { FilterParams } from '../../url-params-serializer';
import { ResourceList, Resource, ResourceData, ResourceQueryParams } from './resources';

export default class ResourceApiClient<TResource extends Resource, TFilterParams extends FilterParams> {
  private readonly _requestExecutor: RequestExecutor;
  private readonly _prefix: string;

  constructor(requestExecutor: RequestExecutor, prefix: string) {
    this._requestExecutor = requestExecutor;
    this._prefix = prefix;
  }

  async createResource<TResourceData extends ResourceData>(
    resourceData: TResourceData,
    attributesToReturn?: string[],
  ): Promise<TResource> {
    const response = await this._requestExecutor.post<TResource>(this._prefix, resourceData, {
      params: attributesToReturn ? { attributes: attributesToReturn } : undefined,
    });
    return response.data;
  }

  async getResourceList(params?: ResourceQueryParams<TFilterParams>): Promise<ResourceList<TResource>> {
    const response = await this._requestExecutor.get<ResourceList<TResource>>(this._prefix, {
      params: params,
    });
    return response.data;
  }

  async getResource(resourceId: string, attributesToReturn?: string[]): Promise<TResource> {
    const response = await this._requestExecutor.get<TResource>(this._prefix + '/' + resourceId, {
      params: attributesToReturn ? { attributes: attributesToReturn } : undefined,
    });
    return response.data;
  }

  async updateResource<TResourceData extends ResourceData>(
    resourceId: string,
    resourceData: TResourceData,
    attributesToReturn?: string[],
  ): Promise<TResource> {
    const response = await this._requestExecutor.put<TResource>(this._prefix + '/' + resourceId, resourceData, {
      params: attributesToReturn ? { attributes: attributesToReturn } : undefined,
    });
    return response.data;
  }

  async patchResource<TResourceData extends ResourceData>(
    resourceId: string,
    patchData: TResourceData,
    attributesToReturn?: string[],
  ): Promise<any> {
    const response = await this._requestExecutor.patch<TResource>(this._prefix + '/' + resourceId, patchData, {
      params: attributesToReturn ? { attributes: attributesToReturn } : undefined,
    });
    if (attributesToReturn) {
      return response.data;
    }
  }

  async deleteResource(resourceId: string): Promise<void> {
    await this._requestExecutor.delete(this._prefix + '/' + resourceId);
  }
}
