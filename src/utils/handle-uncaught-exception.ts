import getLogger from '@utils/get-logger';

const logger = getLogger(__filename);

export default function handleUncaughtException(error: Error): void {
  logger.error(error, 'uncaughtException');
}
