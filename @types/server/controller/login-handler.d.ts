import { Response } from 'express';
import Joi from 'joi';
import { ContainerTypes, ValidatedRequest, ValidatedRequestSchema } from 'express-joi-validation';
interface LoginPayloadRequest {
    email: string;
    password: string;
}
interface LoginRequest extends ValidatedRequestSchema {
    [ContainerTypes.Body]: LoginPayloadRequest;
}
interface LoginPayloadResponse {
    token: string;
    expires: number;
    refreshToken: string;
}
interface StandardPayloadResponse<Data> {
    message: string;
    status: boolean;
    data: Data;
}
export declare const loginReqPayloadSchema: Joi.ObjectSchema<any>;
export default function loginHandler(request: ValidatedRequest<LoginRequest>, response: Response): Response<StandardPayloadResponse<LoginPayloadResponse>>;
export {};
