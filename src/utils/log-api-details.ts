import { NextFunction, Request, Response } from 'express';
import getLogger from '@utils/get-logger';

const logger = getLogger(__filename);

const blacklistedPaths = ['/health', '/'];

export default function logApiDetails(request: Request, response: Response, next: NextFunction): void {
  if (blacklistedPaths.includes(request.path)) {
    return;
  }
  const startTime = Date.now();
  request.on('close', () => {
    logger.info(
      {
        startTime,
        path: request.path,
        query: request.query,
        params: request.params,
        // context: request.context,
        headers: request.headers,
        body: request.body as Buffer,
      },
      'Request',
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
          message: response.statusMessage,
        },
        locals: response.locals,
        headers: response.getHeaders(),
      },
      'Response',
    );
  });

  return next();
}
