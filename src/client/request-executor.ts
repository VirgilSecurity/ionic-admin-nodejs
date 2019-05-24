import axios, { AxiosInstance, AxiosRequestConfig, AxiosPromise, AxiosError } from 'axios';
import { Authentication } from './auth/authentication';
import { IonicApiError } from './errors';

export default class RequestExecutor {
  private _authentication: Authentication;
  private _axios: AxiosInstance;

  constructor(baseURL: string, authentication: Authentication) {
    this._authentication = authentication;
    this._axios = axios.create({ baseURL });
    this._axios.interceptors.request.use(this.requestConfigHandler, undefined);
    this._axios.interceptors.response.use(undefined, this.responseErrorHandler);
  }

  request<T>(config: AxiosRequestConfig): AxiosPromise<T> {
    return this._axios.request<T>(config);
  }

  get<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this._axios.get<T>(url, config);
  }

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._axios.delete(url, config);
  }

  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._axios.head(url, config);
  }

  post<T>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this._axios.post<T>(url, data, config);
  }

  put<T>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this._axios.put<T>(url, data, config);
  }

  patch<T>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this._axios.patch<T>(url, data, config);
  }

  private requestConfigHandler = (config: AxiosRequestConfig) => {
    this._authentication.authenticate(config);
    return config;
  };

  private responseErrorHandler(error: AxiosError): Promise<IonicApiError> {
    const { response } = error;
    if (response) {
      const { data } = response;
      if (data) {
        const message = data.message || error.message;
        return Promise.reject(new IonicApiError(message, response.status, data));
      }
      return Promise.reject(new IonicApiError(error.message, response.status));
    }
    return Promise.reject(new Error(error.message));
  }
}
