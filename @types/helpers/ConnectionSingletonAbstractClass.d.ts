import SingletonClass from '@helpers/SingletonClass'
export default abstract class ConnectionSingletonAbstractClass<
  Connection
> extends SingletonClass {
  protected abstract _connection: Connection
  abstract get connection(): Connection
  abstract connect(): Promise<Connection>
  abstract disconnect(): void | Promise<void>
}
