import { Authentication } from './authentication';
import { AxiosRequestConfig } from 'axios';

export default class BasicAuthentication implements Authentication {
  private _username: string;
  private _password: string;

  constructor(username: string, password: string) {
    this._username = username;
    this._password = password;
  }

  authenticate(req: AxiosRequestConfig) {
    req.headers.Authorization = `Basic ${Buffer.from(`${this._username}:${this._password}`).toString('base64')}`;
  }
}
