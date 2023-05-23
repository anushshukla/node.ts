import { NextFunction, Request, Response } from 'express';
import getLogger from '@utils/get-logger';

const logger = getLogger(__filename);

interface InvalidAuthResponse {
    message: string;
}

export default (
  request: Request,
  response: Response,
  next: NextFunction
): void | Response<InvalidAuthResponse> => {
    if (!request.headers.authorization) {
        logger.error('Invalid authorization request!');
        return response.status(403).json({ message: 'Invalid authorization'});
    }

    return next();
};
