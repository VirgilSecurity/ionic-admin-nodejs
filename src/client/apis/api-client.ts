import RequestExecutor from '../request-executor';

export default class ApiClient {
  readonly requestExecutor: RequestExecutor;
  readonly prefix: string;

  constructor(requestExecutor: RequestExecutor, prefix: string) {
    this.requestExecutor = requestExecutor;
    this.prefix = prefix;
  }
}
