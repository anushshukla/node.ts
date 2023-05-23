import getLogger from '@utils/get-logger';
const logger = getLogger(__filename);

export default function onHttpServerError(error: Error): void {
  logger.info(error, 'HTTP server error');
}
