import { NextFunction, Request, Response } from 'express';
import { ExpressJoiError } from 'express-joi-validation';
import { StatusCode } from '@constants/http';
import getLogger from '@utils/get-logger';
import { UnprocessableEntry } from '@utils/ApplicationError';

const logger = getLogger('src/middleware/logErrors');

// Only errors that arise from an exception in the system should be logged.
export default function errorHandler(
  error: Error | ExpressJoiError,
  __: Request,
  response: Response,
  _: NextFunction
): Response {
  const joiError = error as ExpressJoiError;
  if (error instanceof UnprocessableEntry) {
    return response.reply(
      {
        data: error.data,
        message: error.message
      },
      StatusCode.UNPROCESSABLE_ENTRY
    );
  }
  if (joiError.error && joiError.error.isJoi) {
    return response.reply(
      {
        message: `${joiError.error.message}`,
        data: joiError.error?.details.map((value) => ({ ...value })),
        error: joiError.error
      },
      StatusCode.BAD_REQUEST
    );
  }
  logger.error(error);
  return response.reply(
    {
      message: (error as Error).message,
      data: null,
      error: error as Error
    },
    StatusCode.INTERNAL_SERVER_ERROR
  );
};
