import { StatusCode } from './statusCode';

export class Task<R = any> {
  private code: StatusCode;
  private response: [any, R];

  constructor(code: number, response: [any, R]) {
    this.code = new StatusCode(code);
    this.response = response;
  }

  public statusCode(): StatusCode {
    return this.code;
  }

  public getResponse(): [any, R] {
    return this.response;
  }
}
