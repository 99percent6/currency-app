export class StatusCode {
  private code: number;

  constructor(code: number) {
    this.code = code;
  }

  public getCode(): number {
    return this.code;
  }

  public isSuccessStatus(): boolean {
    return this.code >= 200 && this.code < 300;
  }

  public isFailStatus(): boolean {
    return this.code >= 400;
  }
}
