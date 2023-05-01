import path from 'path';
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import timeout from 'connect-timeout';
import compression from 'compression';
// code imports
import initEnv from "@src/utils/init-env";
import getEnv from "@src/utils/get-env";
import routes from '@server/routes';
import logRequests from '@server/middleware/log-request';
import getLogger from '@utils/logger';
import errorHander from '@src/error-handler';

initEnv();
const logger = getLogger('src/server/index');
const server = express();

// Add global middlewares.
// @ToDo replace the below response compression by implementing reverse proxy
server.use(compression());
server.use(cors({
  origin: getEnv("CORS_ORIGIN"),
  optionsSuccessStatus: 200,
  maxAge: Number(getEnv("CORS_MAXAGE"))
}));
server.use(helmet());
server.use(express.json({
  defaultCharset: "utf-8",
  inflate: true,
  limit: "100kb",
  type: "application/json",
  reviver: null
}));
server.use(express.text({
  defaultCharset: "utf-8",
  inflate: true,
  limit: "100kb",
  type: "text/plain"
}));
server.use(express.raw({
  inflate: true,
  limit: "100kb",
  type: "application/octet-stream"
}));
server.use(express.static({
  dotfiles: "ignore",
  etag: true,
  extensions: false,
  fallthrough: true,
  immutable: false,
  index: "index.html",
  lastModified: true,
  maxAge: 0,
  redirect: true,
  setHeaders: function setStaticHeaders(response, path, stat) {
    response.set('x-timestamp', Date.now())
  }
}));
app.use(compression())
server.use(timeout('5s'));
server.use(logRequests);
// server.use(addLocale);
// server.use(responseEnhancer);
server.use((_req, _res, next) => next(new NotFoundError())); // 404 Page Not Found
server.use(errorHander);
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
