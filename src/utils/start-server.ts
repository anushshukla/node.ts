import initEnv from '@utils/init-env';
import getEnv from '@utils/get-env';
initEnv();
import server from '@server/index';
import getLogger from '@utils/get-logger';
import connectDatabases from '@utils/connect-databases';

const port = getEnv('PORT');
const logger = getLogger(__filename);

export default async function startServer() {
  await connectDatabases(['mongo']);

  const httpServer = server.listen(port);

  httpServer.on('close', () => {
    logger.info('HTTP server closed');
  });

  httpServer.on('error', (error: Error) => {
    logger.error(error, 'HTTP server error');
  });

  httpServer.on('listening', () => {
    logger.info(`HTTP server started listening on port ${port}`);
  });
}
