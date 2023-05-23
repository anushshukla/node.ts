import SingletonClass from "@helpers/SingletonClass";

export default abstract class ConnectionSingletonAbstractClass<
  Connection
> extends SingletonClass {
  protected abstract _connection: Connection;
  /**
   * Get connection
   * @returns {any}
   */
  public abstract get connection(): Connection;
  /**
   * Initiate connection
   * @returns {Promise<Connection>}
   */
  public abstract connect(): Promise<Connection>;
  /**
   * Close connection
   * @returns {void | Promise<void>}
   */
  public abstract disconnect(): void | Promise<void>;
}
