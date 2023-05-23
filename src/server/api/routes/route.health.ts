import { Request, Response, Router } from 'express';

const router = Router();

router.get('/', (_request: Request, response: Response) => {
  return response.status(200).send('ok');
});

export default router;
