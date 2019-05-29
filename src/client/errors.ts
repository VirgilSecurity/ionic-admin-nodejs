export class IonicError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class IonicApiError extends IonicError {
  httpStatus: number;
  data: any;

  constructor(message: string, httpStatus: number, data?: any) {
    super(message);
    this.httpStatus = httpStatus;
    this.data = data;
  }
}
