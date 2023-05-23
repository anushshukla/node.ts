import { Request, Response, Router } from 'express';
import {
    // Creates a validator that generates middlewares
    createValidator
} from 'express-joi-validation'
import routesHealth from '@server/api/routes/routes.probes';
import loginHandler, {loginReqPayloadSchema} from '@server/controller/login-handler';

const validator = createValidator()

const router = Router();

router.use('/', ( _request: Request, response: Response ) => {
    return response.status( 200 ).send( 'ok' );
} );

router.use('/probes', routesHealth );

router.use('/login', validator.query(loginReqPayloadSchema), loginHandler)
    
export default router;