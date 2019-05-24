import { createHmac, createHash } from 'crypto';
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
    this._normalizeRequest(req);
    const hmac = createHmac('sha1', this._apiKeySecret);
    hmac.update(this._createStringToSign(req));
    const signature = hmac.digest('base64');
    req.headers.Authorization = `IONIC ${this._apiKeyId}:${signature}`;
  }

  private _normalizeRequest(req: AxiosRequestConfig): void {
    if (!req.headers.Date) {
      req.headers.Date = new Date().toUTCString();
    }

    if (req.method !== 'GET' && !req.headers['Content-MD5']) {
      req.headers['Content-MD5'] = this._calculateMd5(req.data);
    }
  }

  private _calculateMd5(data: any) {
    const hash = createHash('md5');
    hash.update(typeof data === 'string' ? data : JSON.stringify(data));
    return hash.digest('base64');
  }

  private _createStringToSign(req: AxiosRequestConfig): string {
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
      this._normalizePath(req.url as string),
    ].join('');
  }

  private _normalizePath(path: string): string {
    return path.replace(/^\/v2/, '');
  }
}
