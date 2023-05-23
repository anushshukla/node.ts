import getLogger from '@utils/get-logger';

const logger = getLogger(__filename);

export default function catchUnhandledException(error: Error): void {
    logger.error(error, 'unhandledRejection');
}