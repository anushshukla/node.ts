import { NextFunction, Request, Response } from 'express';
import getLogger from 'utils/logger';

const logger = getLogger('src/middleware/logRequests');

export default (
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  const startTime = Date.now();
  request.on('close', () => {
    logger.info(
      {
        startTime,
        path: request.path,
        query: request.query,
        params: request.params,
        headers: request.headers,
        body: request.body as Buffer
      },
      'Request'
    );
  });
  response.on('finish', () => {
    const endTime = Date.now();
    logger.info(
      {
        endTime,
        duration: endTime - startTime,
        status: {
          code: response.statusCode,
          message: response.statusMessage
        },
        locals: response.locals,
        headers: response.getHeaders()
      },
      'Response'
    );
  });

  return next();
};
