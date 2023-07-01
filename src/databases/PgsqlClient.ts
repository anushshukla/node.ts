import ConnectionSingletonAbstractClass from '@helpers/ConnectionSingletonAbstractClass';
import { DataSource } from 'typeorm';
import { ErrorCodes } from '@constants';
import { InternalServerError } from '@helpers/HttpError';
import getEnv from '@utils/get-env';
import getSqllUrlComponents from '@utils/get-sql-url-components';
import { logger } from '@utils/get-logger';
import path from 'path';
import safePromise from '@utils/safe-promise';

export default class PgsqlClient extends ConnectionSingletonAbstractClass<DataSource> {
  protected _name = 'default';
  protected _type = 'postgres';
  protected _connectionUrl = getEnv('PSQL_URL') as string;
  protected _slaves = getSqllUrlComponents(getEnv('PSQL_REPLICA_URLS') as string);
  protected _connection: DataSource;

  public get connection(): DataSource {
    return this._connection;
  }

  /**
   * Initiate connection to PGSQL
   * @returns {Promise<any>}
   */
  // eslint-disable-next-line max-lines-per-function, complexity, max-statements
  public async connect(): Promise<DataSource> {
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

    const dataSource = new DataSource({
      name: this._name,
      type: 'postgres',
      entities: [path.join(__dirname, '..', 'services/models') + '/*.{ts,js}'],
      poolSize: getEnv('PGSQL_POOL_MAX', 10) as number,
      synchronize: getEnv('PGSQL_ENABLE_SYNCHRONIZE', false) as boolean,
      cache: {
        // provider: customRedisQueryResultCache
      },
      logging: getEnv('PGSQL_ENABLE_LOGGING', false) as boolean,
      url: url,
      replication: replication,
    });

    const [connectionError, connection] = await safePromise<DataSource>(dataSource.initialize());

    if (connectionError) {
      logger.error(connectionError, 'connectionError');
      throw connectionError;
    }

    if (!connection) {
      throw new InternalServerError('Something went wrong!', { code: ErrorCodes.DB_CONN_FAILED });
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
