import path from 'path';
import express from 'express';
import compression from 'compression';
import dotenv from 'dotenv';
import cors from 'cors';
import { json } from 'body-parser';
import helmet from 'helmet';

// Load env from .env files.
const envInit = dotenv.config({
  path: path.resolve(
    __dirname,
    '../../.env'
  ),
  encoding: 'utf8'
});

import routes from '@server/routes';
import logRequests from '@server/middleware/log-request';
import getLogger from '@utils/logger';

const logger = getLogger('src/server/index');

if (envInit.error) {
  throw envInit.error;
}

const server = express();

// Add global middlewares.
// @ToDo replace the below response compression by implementing reverse proxy
server.use(compression());
server.use(cors({
  origin: process.env.CORS_ORIGIN,
  maxAge: Number(process.env.CORS_MAXAGE)
}));
server.use(helmet());
server.use(json());
server.use(logRequests);
// server.use(addLocale);
// server.use(responseEnhancer);
server.use(routes);

const httpServer = server.listen(3000);

httpServer.on("close", () => {
  logger.info('Http server closed');
})

httpServer.on("error", (error: Error) => {
  logger.error(error, 'Http server error');
})

httpServer.on("listening", () => {
  logger.info(`Http server started listening on port ${process.env.PORT}`);
})
