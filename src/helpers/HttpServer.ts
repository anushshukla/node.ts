import connectDatabases from '@utils/connect-databases';
import getEnv from '@utils/get-env';
import getLogger from '@utils/get-logger';
import server from '@server/api/index';
import ProcessEventListner from '@src';

const logger = getLogger(__filename);

export default class HttpServer {
  private _port: number;

  constructor(port = getEnv('PORT') as number) {
    this._port = port;
  }

  public static getInstance(): HttpServer {
    return new HttpServer();
  }

  public async start() {
    new ProcessEventListner();
    await connectDatabases(['psql', 'redis']);
    const httpServer = server.listen(this._port);
    httpServer.on('close', this._onClose);
    httpServer.on('error', this._onError);
    httpServer.on('listening', this._onListening.bind(this));
    return httpServer;
  }
  private _onClose(): void {
    logger.info('HTTP server closed');
  }
  private _onError(error: Error): void {
    logger.info(error, 'HTTP server error');
  }
  private _onListening() {
    logger.info(`HTTP server started listening on port ${this._port}`);
  }
}
