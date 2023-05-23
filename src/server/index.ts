import express from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import timeout from 'connect-timeout';
// code imports
import initEnv from '@utils/init-env';
import getEnv from '@utils/get-env';
import routes from '@server/api/routes';
import logRequests from '@server/api/middleware/log-request';
import errorHander from '@server/controller/error-handler';
import notFoundHandler from '@server/controller/not-found-handler';
import handleUncaughtException from '@utils/handle-uncaught-exception';
import catchUnhandledException from '@utils/catch-unhandled-exception';
import addRequestId from '@src/server/api/middleware/add-request-id';
import {
  CHARSET_UTF_8,
  CONTENT_TYPE,
  HttpStatusCode,
  SIZE_100_KB,
} from '@src/constants';
import loadApiDocsRoute from '@src/server/api/routes/route.api-docs';

initEnv();

const server = express();

// Add global middlewares.
const globalMiddlewares = [
  // @ToDo replace the below response compression by implementing reverse proxy
  compression({ default: 16384, threshold: '1kb' }),
  cors({
    optionsSuccessStatus: HttpStatusCode.OK,
    origin: getEnv('CORS_ORIGIN') as string,
    maxAge: getEnv('CORS_MAXAGE') as number,
  }),
  // security
  helmet(),
  express.json({
    inflate: true,
    limit: SIZE_100_KB,
    type: CONTENT_TYPE.APPLICATION_JSON,
    strict: true,
  }),
  express.text({
    defaultCharset: CHARSET_UTF_8,
    inflate: true,
    limit: SIZE_100_KB,
    type: CONTENT_TYPE.TEXT_PLAIN,
  }),
  express.raw({
    inflate: true,
    limit: SIZE_100_KB,
    type: CONTENT_TYPE.APPLICATION_OCTET_STREAM,
  }),
  timeout('3s'),
  express.static('test'),
  addRequestId,
  logRequests,
];

for (const middleware of globalMiddlewares) {
  server.use(middleware);
}

// server.use(addLocale);
// server.use(responseEnhancer);
server.use(notFoundHandler); // 404 Page Not Found
server.use(errorHander);

loadApiDocsRoute(server);
server.use(routes);

process.on('unhandledRejection', catchUnhandledException);
process.on('uncaughtException', handleUncaughtException);

export default server;
