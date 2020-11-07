class Logger {
  private logger: Console;

  constructor() {
    this.logger = console;
  }

  public log(...args): void {
    this.logger.log(args);
  }

  public error(...args): void {
    this.logger.error(args);
  }
}

export default new Logger();
