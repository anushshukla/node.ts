import {
  Cluster as RedisCluster,
  Redis as RedisStandalone,
  RedisOptions,
} from 'ioredis'
import ConnectionSingletonAbstractClass from '@helpers/ConnectionSingletonAbstractClass'
declare type Connection = RedisCluster | RedisStandalone
export declare class RedisClient extends ConnectionSingletonAbstractClass<Connection> {
  protected _connection: Connection
  protected setStandaloneRedisConnect(config: RedisOptions): void
  protected setClusterRedisConnect(config: RedisOptions): void
  get connection(): Connection
  isConnecting(): boolean
  connect(): Promise<Connection>
  disconnect(): void
}
export declare class RedisClusterClient extends RedisClient {
  private constructor()
}
export declare class RedisStandaloneClient extends RedisClient {
  private constructor()
}
export declare class RedisSubscriberClient extends RedisClient {
  private constructor()
}
export declare class RedisBroadcasterClient extends RedisClient {
  private constructor()
}
export default RedisStandaloneClient
