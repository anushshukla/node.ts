import IORedis, { Cluster as RedisCluster, RedisOptions, Redis as RedisStandalone } from 'ioredis';
import ConnectionSingletonAbstractClass from '@helpers/ConnectionSingletonAbstractClass';
import { Nullable } from '@types';
import getEnv from '@utils/get-env';
import getLogger from '@utils/get-logger';

const logger = getLogger(__filename);

type Connection = RedisCluster | RedisStandalone;

export { RedisStandalone };

export class RedisClient extends ConnectionSingletonAbstractClass<Connection> {
  protected _connection: Connection;

  protected setStandaloneRedisConnect(config: RedisOptions): void {
    this._connection = new IORedis(config);
    this._setBasicListeners();
  }

  protected setClusterRedisConnect(config: RedisOptions): void {
    this._connection = new RedisCluster([config], {
      scaleReads: 'slave',
      dnsLookup: (address, callback) => callback(null, address), // Alternative DNS lookup function (dns.lookup() is used by default). It may be useful to override this in special cases, such as when AWS ElastiCache used with TLS enabled.
    });
    this._setBasicListeners();
  }

  private _setBasicListeners() {
    this._connection.on('error', this._onError);
    this._connection.on('connect', this._onConnect);
    this._connection.on('close', this._onClose);
    this._connection.on('reconnecting', this._onReconnection);
    this._connection.on('end', this._onEnd);
  }

  private _onConnect(): void {
    logger.info('Redis connected');
  }

  private _onError(error: Error): void {
    logger.info(error, 'Redis connection error');
  }

  private _onClose(): void {
    logger.info('Redis connection closed');
  }

  private _onReconnection(): void {
    logger.info('Redis reconnecting after closing connection');
  }

  private _onEnd(): void {
    logger.info('Redis connection ended & no more reconnecting');
  }

  get connection(): Connection {
    return this._connection;
  }

  public isConnecting(): boolean {
    return this._connection.status === 'connecting';
  }

  // eslint-disable-next-line complexity, require-await
  public async connect(): Promise<Connection> {
    if (this._connection) {
      return this._connection;
    }

    if (this.isConnecting()) {
      logger.info('Redis is connecting');
      return this._connection;
    }

    return this._connection;
  }

  public disconnect(): void {
    this._connection.disconnect();
  }

  public getValue(key: string): Promise<Nullable<string>> {
    return this._connection.get(key);
  }

  public setValue(key: string, value: string, expiry: number): Promise<string> {
    return this._connection.set(key, value, 'EX', expiry);
  }

  public incrValue(key: string, increment: number): Promise<number> {
    return this._connection.incrby(key, increment);
  }

  public decrValue(key: string, decrement: number): Promise<number> {
    return this._connection.decrby(key, decrement);
  }

  public delete(key: string): Promise<number> {
    return this._connection.del(key);
  }
}

export class RedisClusterClient extends RedisClient {
  private constructor() {
    super();
    this.setClusterRedisConnect({
      port: getEnv('REDIS_PORT', 6379) as number,
      host: getEnv('REDIS_HOST') as string,
      password: getEnv('REDIS_PASSWORD', '') as string,
      db: getEnv('REDIS_DB_NAME', 0) as number,
      family: getEnv('REDIS_FAMILY', 4) as number,
    });
  }
}

export class RedisStandaloneClient extends RedisClient {
  protected constructor() {
    super();
    this.setStandaloneRedisConnect({
      port: getEnv('REDIS_PORT', 6379) as number,
      host: getEnv('REDIS_HOST') as string,
      password: getEnv('REDIS_PASSWORD', '') as string,
      db: getEnv('REDIS_DB_NAME', 0) as number,
      family: getEnv('REDIS_FAMILY', 4) as number,
      maxRetriesPerRequest: null,
      enableReadyCheck: false,
    });
  }
}

export class RedisSubscriberClient extends RedisStandaloneClient {
  // @ToDo implement contructor if redis config is different
}
export class RedisBroadcasterClient extends RedisClient {
  // @ToDo implement contructor if redis config is different
}

export default RedisStandaloneClient;
