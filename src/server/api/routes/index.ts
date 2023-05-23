import { Request, Response, Router } from 'express';
import routesHealth from '@server/api/routes/routes.probes';

const router = Router();

router.get('/', (_request: Request, response: Response) => {
  return response.status(200).send('ok');
});

router.get('/probes', routesHealth);

export default router;