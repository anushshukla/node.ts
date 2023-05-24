import IORedis, { Cluster as RedisCluster, Redis as RedisStandalone, RedisOptions } from 'ioredis';
import ConnectionSingletonAbstractClass from '@helpers/ConnectionSingletonAbstractClass';
import getEnv from '@utils/get-env';
import getLogger from '@utils/get-logger';

const logger = getLogger(__filename);

type Connection = RedisCluster | RedisStandalone;

export class RedisClient extends ConnectionSingletonAbstractClass<Connection> {
  protected _connection = {} as Connection;

  protected setStandaloneRedisConnect(config: RedisOptions): void {
    this._connection = new IORedis(config);
  }

  protected setClusterRedisConnect(config: RedisOptions): void {
    this._connection = new RedisCluster([config], {
      scaleReads: 'slave',
      dnsLookup: (address, callback) => callback(null, address), // Alternative DNS lookup function (dns.lookup() is used by default). It may be useful to override this in special cases, such as when AWS ElastiCache used with TLS enabled.
    });
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
  private constructor() {
    super();
    this.setStandaloneRedisConnect({
      port: getEnv('REDIS_POST', 6379) as number,
      host: getEnv('REDIS_HOST') as string,
      password: getEnv('REDIS_PASSWORD', '') as string,
      db: getEnv('REDIS_DB_NAME', 0) as number,
      family: getEnv('REDIS_FAMILY', 4) as number,
      maxRetriesPerRequest: null,
      enableReadyCheck: false,
    });
  }
}

export class RedisSubscriberClient extends RedisClient {
  private constructor() {
    super();
    this.setStandaloneRedisConnect({
      port: getEnv('REDIS_POST', 6379) as number,
      host: getEnv('REDIS_HOST') as string,
      password: getEnv('REDIS_PASSWORD', '') as string,
      db: getEnv('REDIS_DB_NAME', 0) as number,
      family: getEnv('REDIS_FAMILY', 4) as number,
      maxRetriesPerRequest: null,
      enableReadyCheck: false,
    });
  }
}
export class RedisBroadcasterClient extends RedisClient {
  private constructor() {
    super();
    this.setStandaloneRedisConnect({
      port: getEnv('REDIS_POST', 6379) as number,
      host: getEnv('REDIS_HOST') as string,
      password: getEnv('REDIS_PASSWORD', '') as string,
      db: getEnv('REDIS_DB_NAME', 0) as number,
      family: getEnv('REDIS_FAMILY', 4) as number,
      maxRetriesPerRequest: null,
      enableReadyCheck: false,
    });
  }
}

export default RedisStandaloneClient;
