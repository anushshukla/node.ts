import getLogger from '@utils/get-logger';
const logger = getLogger(__filename);

export default function onHttpServerStartHoF(port: number) {
  return function onHttpServerError(): void {
    logger.info(`HTTP server started listening on port ${port}`);
  };
}
