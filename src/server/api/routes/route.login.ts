import { Router } from 'express';
import {
  // Creates a validator that generates middlewares
  createValidator,
} from 'express-joi-validation';
import loginHandler, { loginReqPayloadSchema } from '@server/controller/login-handler';

const router = Router();

/**
 * Login Request Payload
 * @typedef {object} LoginReqPayload
 * @property {string} email.required - The title
 * @property {string} password.required - The artist
 */

/**
 * GET /api/v1
 * @summary This is the login API
 * @param {LoginReqPayload} request.body.required - Login Request Payload
 * @return {object} 200 - success response
 */
router.post('/login', createValidator().query(loginReqPayloadSchema), loginHandler);

export default router;
