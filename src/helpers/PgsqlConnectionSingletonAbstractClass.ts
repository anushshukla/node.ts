import path from 'path';
import { createConnection, Connection } from 'typeorm';
import ConnectionSingletonAbstractClass from '@helpers/ConnectionSingletonAbstractClass';
import getEnv from '@utils/get-env';
import safePromise from '@utils/safe-promise';
import { SqlUrlComponentsInterface } from '@src/utils/get-sql-url-components';
import getLogger from '@utils/get-logger';

const logger = getLogger(__filename);

// eslint-disable-next-line max-len
export default abstract class SqlConnectionSingletonAbstractClass extends ConnectionSingletonAbstractClass<Connection> {
  protected _connection = {} as Connection;
  protected abstract _name: string;
  protected abstract _type: string;
  protected abstract _connectionUrl: string;
  protected _slaves?: SqlUrlComponentsInterface[];

  public get connection(): Connection {
    return this._connection;
  }

  /**
   * Initiate connection to PGSQL
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
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'Theeb6uu',
        database: 'typeormdemo',
        entities: [
          path.join(__dirname, '..', 'models', 'entities') + '/*{.ts,.js}',
        ],
        poolSize: getEnv('PGSQL_POOL_MAX', 10) as number,
        synchronize: getEnv('PGSQL_ENABLE_SYNCHRONIZE', false) as boolean,
        cache: {
          // provider: customRedisQueryResultCache
        },
        logging: getEnv('PGSQL_ENABLE_LOGGING', false) as boolean,
        url: url,
        replication: replication,
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
    logger.info(`${this._name} PGSQL connected!`);
    return connection;
  }

  /**
   * Disconnects from PGSQL
   * @returns {void}
   */
  public disconnect(): Promise<void> {
    return this._connection.close();
  }
}
