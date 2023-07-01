import { ErrorCodes } from '@constants';

interface IApplicationErrorOptions<ErrorData> {
  data?: ErrorData;
  code?: ErrorCodes;
}

interface HttpErrorConfig<ErrorData> {
  options?: IApplicationErrorOptions<ErrorData>;
  status?: number;
  message: string;
}

export default class HttpError<ErrorData> extends Error {
  protected _data?: ErrorData;
  protected _code?: string;
  protected _status: number;
  public constructor({ message, options }: HttpErrorConfig<ErrorData>);
  // eslint-disable-next-line complexity
  public constructor({ message, status, options }: HttpErrorConfig<ErrorData>) {
    super(message);
    this._status = status ?? this.status;
    this._data = options?.data;
    this._code = options?.code || this.code;
  }
  get status(): number {
    return this._status;
  }
  get data(): undefined | ErrorData {
    return this._data;
  }
  get code(): undefined | string {
    return this._code;
  }
}

export class DefinedHttpError<ErrorData> extends HttpError<ErrorData> {
  constructor(message: string, options?: IApplicationErrorOptions<ErrorData>) {
    super({ message, options });
  }
}

export class UnprocessableEntry<ErrorData> extends DefinedHttpError<ErrorData> {
  public readonly _status = 422;
}

export class NotFound<ErrorData> extends DefinedHttpError<ErrorData> {
  public readonly _status = 404;
}

export class BadRequest<ErrorData> extends DefinedHttpError<ErrorData> {
  public readonly _status = 400;
}

export class Forbidden<ErrorData> extends DefinedHttpError<ErrorData> {
  public readonly _status = 403;
}
export class ResourceGone<ErrorData> extends DefinedHttpError<ErrorData> {
  public readonly _status = 410;
}

export class ConflictingError<ErrorData> extends DefinedHttpError<ErrorData> {
  public readonly _status = 409;
}

export class TooManyRequest<ErrorData> extends DefinedHttpError<ErrorData> {
  protected _code = ErrorCodes.TOO_MANY_REQUEST;
  public readonly _status = 429;
}

export class InternalServerError<ErrorData> extends DefinedHttpError<ErrorData> {
  public readonly _status = 500;
}
