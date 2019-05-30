import { createHmac } from 'crypto';
import { parse } from 'url';
import { Authentication } from './authentication';
import { AxiosRequestConfig } from 'axios';

export default class MacAuthentication implements Authentication {
  private _apiKeyId: string;
  private _apiKeySecret: Buffer;

  constructor(apiKeyId: string, apiKeySecret: string) {
    this._apiKeyId = apiKeyId;
    this._apiKeySecret = Buffer.from(apiKeySecret, 'base64');
  }

  authenticate(req: AxiosRequestConfig): void {
    normalizeRequest(req);
    const hmac = createHmac('sha1', this._apiKeySecret);
    hmac.update(createStringToSign(req));
    const signature = hmac.digest('base64');
    req.headers.Authorization = `IONIC ${this._apiKeyId}:${signature}`;
  }
}

function normalizeRequest(req: AxiosRequestConfig): void {
  if (!req.headers.Date) {
    req.headers.Date = new Date().toUTCString();
  }
}

function createStringToSign(req: AxiosRequestConfig): string {
  const newLine = '\u000A';
  return [
    req.method,
    newLine,
    req.headers['Content-MD5'] || '',
    newLine,
    req.headers['Content-Type'] || '',
    newLine,
    req.headers['Date'],
    newLine,
    getNormalizedPathname(req.url as string),
  ].join('');
}

function getNormalizedPathname(url: string): string {
  const { pathname = '' } = parse(url);
  return pathname.replace(/^\/v2/, '');
}
