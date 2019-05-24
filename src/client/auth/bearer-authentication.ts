import { Authentication } from './authentication';
import { AxiosRequestConfig } from 'axios';

export default class BearerAuthentication implements Authentication {
  private _secretToken: string;

  constructor(secretToken: string) {
    this._secretToken = secretToken;
  }

  authenticate(req: AxiosRequestConfig) {
    req.headers.Authorization = `Bearer ${this._secretToken}`;
  }
}
