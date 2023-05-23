import { NextFunction, Request, Response } from 'express';
import { ExpressJoiError } from 'express-joi-validation';
export default function errorHandler(error: Error | ExpressJoiError, __: Request, response: Response, _: NextFunction): Response;
