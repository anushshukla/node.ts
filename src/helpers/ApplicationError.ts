interface IApplicationErrorOptions {
  data: Record<string, unknown>;
}

export default class ApplicationError extends Error {
  public data?: IApplicationErrorOptions['data'];
  constructor(message: string, options?: IApplicationErrorOptions) {
    super(message);
    this.data = options?.data;
  }
}

export class UnprocessableEntry extends ApplicationError {
  public data?: IApplicationErrorOptions['data'];
  constructor(message: string, options?: IApplicationErrorOptions) {
    super(message);
    this.data = options?.data;
  }
}
