import RequestExecutor from '../request-executor';
import { buildUrlParams, QueryParams, ResourceFilterParams } from '../url-params-builder';
import { ResourceList, Resource, ResourceData } from './scim/resources';

export default class ResourceApiClient<TResource extends Resource, TFilterParams extends ResourceFilterParams> {
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
      params: attributesToReturn ? buildUrlParams({ attributes: attributesToReturn }) : undefined,
    });
    return response.data;
  }

  async getResourceList(params?: QueryParams<TFilterParams>): Promise<ResourceList<TResource>> {
    const response = await this._requestExecutor.get<ResourceList<TResource>>(this._prefix, {
      params: params ? buildUrlParams(params) : undefined,
    });
    return response.data;
  }

  async getResource(resourceId: string, attributesToReturn?: string[]): Promise<TResource> {
    const response = await this._requestExecutor.get<TResource>(this._prefix + '/' + resourceId, {
      params: attributesToReturn ? buildUrlParams({ attributes: attributesToReturn }) : undefined,
    });
    return response.data;
  }

  async updateResource<TResourceData extends ResourceData>(
    resourceId: string,
    resourceData: TResourceData,
    attributesToReturn?: string[],
  ): Promise<TResource> {
    const response = await this._requestExecutor.put<TResource>(this._prefix + '/' + resourceId, resourceData, {
      params: attributesToReturn ? buildUrlParams({ attributes: attributesToReturn }) : undefined,
    });
    return response.data;
  }

  async patchResource<TResourceData extends ResourceData>(
    resourceId: string,
    patchData: TResourceData,
    attributesToReturn?: string[],
  ): Promise<any> {
    const response = await this._requestExecutor.patch<TResource>(this._prefix + '/' + resourceId, patchData, {
      params: attributesToReturn ? buildUrlParams({ attributes: attributesToReturn }) : undefined,
    });
    if (attributesToReturn) {
      return response.data;
    }
  }

  async deleteResource(resourceId: string): Promise<void> {
    await this._requestExecutor.delete(this._prefix + '/' + resourceId);
  }
}
