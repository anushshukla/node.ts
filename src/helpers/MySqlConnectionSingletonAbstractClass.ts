import path from 'path';
import { createConnection, Connection } from 'typeorm';
import ConnectionSingletonAbstractClass from '@helpers/ConnectionSingletonAbstractClass';
import getEnv from '@utils/get-env';
import safePromise from '@utils/safe-promise';
import { MySqlUrlComponentsInterface } from '@utils/get-mysql-url-components';
import getLogger from '@utils/get-logger';

const logger = getLogger(__filename);

// eslint-disable-next-line max-len
export default abstract class MySqlConnectionSingletonAbstractClass extends ConnectionSingletonAbstractClass<Connection> {
  protected _connection = {} as Connection;

  protected abstract _name: string;

  protected abstract _connectionUrl: string;

  protected _slaves?: MySqlUrlComponentsInterface[];

  public get connection(): Connection {
    return this._connection;
  }

  /**
   * Initiate connection to MySQL
   * @returns {Promise<any>}
   */
  // eslint-disable-next-line max-lines-per-function, complexity, max-statements
  public async connect(): Promise<Connection> {
    if (this._connection) {
      return this._connection;
    }

    let url;
    let replication;
    if (this._slaves) {
      replication = {
        canRetry: !getEnv('MYSQL_REPLICATION_DISABLE_RETRY', false) as boolean,
        removeNodeErrorCount: getEnv(
          'MYSQL_REPLICATION_REMOVE_NODE_ERROR_COUNT',
          5
        ) as number,
        restoreNodeTimeout: getEnv(
          'MYSQL_REPLICATION_RESTORE_NODE_TIMEOUT',
          0
        ) as number,
        // selector: getEnv('MYSQL_REPLICATION_SELECTOR', 'RR') as string,
        master: {
          url: this._connectionUrl,
        },
        slaves: this._slaves,
      };
    } else {
      url = this._connectionUrl;
    }

    const [connectionError, connection] = await safePromise<Connection>(
      createConnection({
        name: this._name,
        type: 'mysql',
        entities: [
          path.join(__dirname, '..', 'models', 'entities') + '/*{.ts,.js}',
        ],
        trace: !getEnv('MYSQL_DISABLE_TRACE', true) as boolean,
        bigNumberStrings: getEnv('MYSQL_ENABLE_BIGINT', true) as boolean,
        synchronize: getEnv('MYSQL_ENABLE_SYNCHRONIZE', false) as boolean,
        logging: getEnv('MYSQL_ENABLE_LOGGING', false) as boolean,
        debug: getEnv('MYSQL_ENABLE_DEBUG', false) as boolean,
        connectTimeout: getEnv('MYSQL_CONNECT_TIMEOUT', 10000) as number,
        acquireTimeout: getEnv('MYSQL_ACQUIRE_TIMEOUT', 10000) as number,
        extra: {
          connectionLimit: getEnv('MYSQL_POOL_MAX', 10) as number,
        },
        cache: {
          // provider: customRedisQueryResultCache
        },
        url,
        replication,
      })
    );

    if (connectionError) {
      logger.error(connectionError, 'connectionError');
      throw connectionError;
    }

    if (!connection) {
      throw new Error('connection not established');
    }

    this._connection = connection;
    logger.info(`${this._name} MySQL connected!`);
    return connection;
  }

  /**
   * Disconnects from MySQL
   * @returns {void}
   */
  public disconnect(): Promise<void> {
    return this._connection.close();
  }
}
