import initEnv from "@src/utils/init-env";
import getEnv from "@src/utils/get-env";
initEnv();
import app from '@src/app';
import parentLogger from "@src/utils/get-logger";
import connectDatabases from "@src/utils/connect-database";

const port = getEnv("PORT");
const logger = parentLogger.child({
  filepath: __filename,
});

export default async function startServer() {
  await connectDatabases(["mongo"]);
  app.listen(port, () => {
    logger.info({ port }, 'server started');
  }).on('error', (error) => {
      logger.info(error, 'server crashed');
  });
}
