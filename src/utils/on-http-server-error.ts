import getLogger from '@utils/get-logger';
const logger = getLogger(__filename);

export default function onHttpServerError(): void {
  logger.info('HTTP server error');
}
