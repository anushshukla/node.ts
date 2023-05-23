import { Router, Request, Response } from 'express';
// import mySqlConnector from '@db/mysql.connector';
// import { mongoDb } from '@db/mongo.db';

const router = Router();

router.use('/probes/start-up', (_request: Request, response: Response) => {
  return response.status(200).send('ok');
});

router.use('/probes/liveness', (_request: Request, response: Response) => {
  const isShuttingDown = false;
  if (isShuttingDown) {
    response.status(500).send('shutting down');
  }
  return response.status(200).send('alive');
});

router.use('/probes/readiness', (_request: Request, response: Response) => {
  //   if (
  //     mySqlConnector.connection.isConnected &&
  //     [0, 3].includes(mongoDb.readyState)
  //   ) {
  //     return response.status(200).send('ready');
  //   }
  return response.status(500).send('not ready');
});

export default router;
