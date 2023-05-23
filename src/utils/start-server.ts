import initEnv from '@utils/init-env';
import getEnv from '@utils/get-env';
initEnv();
import server from '@server/api/routes/index';
import connectDatabases from '@utils/connect-databases';
import onHttpServerError from '@src/utils/on-http-server-error';
import onHttpServerClose from '@src/utils/on-http-server-close';
import onHttpServerStartHoF from '@src/utils/on-http-server-start';

const port = getEnv('PORT') as number;

export default async function startServer() {
  await connectDatabases(['mongo']);

  const httpServer = server.listen(port);
  httpServer.on('close', onHttpServerClose);
  httpServer.on('error', onHttpServerError);
  httpServer.on('listening', onHttpServerStartHoF(port));
}
