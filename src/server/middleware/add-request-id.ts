import { NextFunction, Request, Response } from 'express';
import { createNamespace, getNamespace } from 'cls-hooked';
import { v4 as uuid } from 'uuid';

export const NAMESPACE_NAME = 'http-request';

export const CONTEXT_REQUEST_ID_NAME = 'reqUuid';

const session = createNamespace(NAMESPACE_NAME);

export const getRequestId = (): string => {
  const requestId = session.get(CONTEXT_REQUEST_ID_NAME) as string;
  return requestId;
};

export default (
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  const namespace = getNamespace(NAMESPACE_NAME);

  if (!namespace) {
    return next();
  }

  // wrap the events from request and response
  namespace.bindEmitter(request);
  namespace.bindEmitter(response);

  namespace.run(() => {
    const tid = uuid();
    namespace.set(CONTEXT_REQUEST_ID_NAME, tid);
    next();
  });
};
