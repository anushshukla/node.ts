import { NextFunction, Request, Response } from 'express';
import { ExpressJoiError } from 'express-joi-validation';
import { UnprocessableEntry } from '@helpers/ApplicationError';
import { HttpStatusCode } from '@src/constants';
import getLogger from '@utils/get-logger';

const logger = getLogger(__filename);

// Only errors that arise from an exception in the system should be logged.
export default function errorHandler(
  error: Error | ExpressJoiError,
  __: Request,
  response: Response,
  _: NextFunction
): Response {
  const joiError = error as ExpressJoiError;
  if (error instanceof UnprocessableEntry) {
    return response.status(HttpStatusCode.UNPROCESSABLE_ENTRY).json(
      {
        data: error.data,
        message: error.message
      }
    );
  }
  if (joiError.error && joiError.error.isJoi) {
    return response.status(HttpStatusCode.BAD_REQUEST).json(
      {
        message: `${joiError.error.message}`,
        data: joiError.error?.details.map((value) => ({ ...value })),
        error: joiError.error
      }
    );
  }
  logger.error(error);
  return response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(
    {
      message: (error as Error).message,
      data: null,
      error: error as Error
    }
  );
};
