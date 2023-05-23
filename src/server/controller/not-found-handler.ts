import getLogger from '@utils/get-logger';
import { Request, Response } from 'express';

const logger = getLogger(__filename);

// Only errors that arise from an exception in the system should be logged.
export default function errorHandler(
  __: Request,
  response: Response
): Response {
  return response.status(404).json({
    message: 'API not found',
    error: null,
  });
}
