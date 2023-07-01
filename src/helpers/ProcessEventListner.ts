import getLogger from '@utils/get-logger';

const logger = getLogger(__filename);

export default class ProcessEventListner {
  constructor() {
    process.on('unhandledRejection', this._catchUnhandledException);
    process.on('uncaughtException', this._handleUncaughtException);
  }

  private _catchUnhandledException(error: Error): void {
    logger.error(error, 'unhandledRejection');
  }

  private _handleUncaughtException(): void {
    logger.error('uncaughtException');
  }
}
