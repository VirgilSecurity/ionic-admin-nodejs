import { AxiosRequestConfig } from 'axios';

export interface BasicAuthOptions {
  type: 'basic';
  username: string;
  password: string;
}

export interface BearerAuthOptions {
  type: 'bearer';
  secretToken: string;
}

export interface MacAuthOptions {
  type: 'mac';
  apiKeyId: string;
  apiKeySecret: string;
}

export type AuthOptions = BasicAuthOptions | BearerAuthOptions | MacAuthOptions;

export interface Authentication {
  authenticate(req: AxiosRequestConfig): void;
}
