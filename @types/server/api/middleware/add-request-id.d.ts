import { NextFunction, Request, Response } from 'express';
export declare const NAMESPACE_NAME = "http-request";
export declare const CONTEXT_REQUEST_ID_NAME = "reqUuid";
export declare const getRequestId: () => string;
declare const _default: (request: Request, response: Response, next: NextFunction) => void;
export default _default;
