import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';
import Application from '@services/models/Application';

export interface StandardPayloadResponse<Data> {
  message: string;
  status: boolean;
  data: Data;
}

export type Nullable<T> = T | null;

export interface RequestContext {
  application: Application;
  session: null;
}

export interface ProtectedReqSchema extends ValidatedRequestSchema {
  [ContainerTypes.Headers]: {
    authorization?: string;
  };
  context: RequestContext;
}

export const DEFAULT_TIME_ZONE = 'Asia/Kolkata';

export const CHARSET_UTF_8 = 'utf8';

export const SIZE_100_KB = '100kb';

export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  UNPROCESSABLE_ENTRY = 422,
  INTERNAL_SERVER_ERROR = 500,
  CONFLICT = 409,
}

export enum CONTENT_TYPE {
  APPLICATION_JSON = 'application/json',
  TEXT_PLAIN = 'text/plain',
  APPLICATION_OCTET_STREAM = 'application/octet-stream',
}

export enum REVIEW_STATUS {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      context: RequestContext;
    }
  }
}
