import { Request, Response } from 'express';

// Only errors that arise from an exception in the system should be logged.
export default function errorHandler(request: Request, response: Response): Response {
  return response.status(404).json({
    message: 'API not found',
    data: {
      path: request.path,
      method: request.method,
    },
    error: null,
  });
}
