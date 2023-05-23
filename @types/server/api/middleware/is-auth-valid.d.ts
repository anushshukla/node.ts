import { NextFunction, Request, Response } from 'express';
interface InvalidAuthResponse {
    message: string;
}
declare const _default: (request: Request, response: Response, next: NextFunction) => void | Response<InvalidAuthResponse>;
export default _default;
