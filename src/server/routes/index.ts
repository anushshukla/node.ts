import { Request, Response, Router } from 'express';
import routesHealth from '@server/routes/routes.probes';

const router = Router();

router.use( '/', ( _request: Request, response: Response ) => {
    return response.status( 200 ).send( 'ok' );
} );

router.use( '/probes', routesHealth );
    
export default router;