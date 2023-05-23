import { Response } from 'express';
import Joi from 'joi';
import {
  ContainerTypes,
  // Use this as a replacement for express.Request
  ValidatedRequest,
  // Extend from this to define a valid schema type/interface
  ValidatedRequestSchema,
} from 'express-joi-validation';

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

export const loginReqPayloadSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export default function loginHandler(
  request: ValidatedRequest<LoginRequest>,
  response: Response
): Response<StandardPayloadResponse<LoginPayloadResponse>> {
  return response.json({
    status: true,
    message: 'Login successful',
    data: {
      token: '',
      expires: 0,
      refreshToken: '',
    },
  });
}
