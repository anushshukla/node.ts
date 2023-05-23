import mongoose, { Connection } from "mongoose";
import ConnectionSingletonAbstractClass from "@helpers/ConnectionSingletonAbstractClass";
import getEnv from "@utils/get-env";
import safePromise from "@utils/safe-promise";
import getLogger from "@utils/get-logger";

const logger = getLogger(__filename);

// Singleton class
export class MongoClient extends ConnectionSingletonAbstractClass<Connection> {
  protected _connection = {} as Connection;

  public get connection(): Connection {
    return this._connection;
  }

  /**
   * Initiate connection to Mongo
   * @returns {Promise<any>}
   */
  // eslint-disable-next-line complexity, max-statements
  public async connect(): Promise<Connection> {
    if (this._connection) {
      return this._connection;
    }

    const [connectionError, mongo] = await safePromise<Connection>(
      mongoose
        .set("debug", getEnv("MONGO_ALLOW_DEBUG") as boolean)
        .createConnection(getEnv("MONGO_HOST") as string)
        .asPromise()
    );

    if (connectionError) {
      logger.error(connectionError, "connectionError");
      throw connectionError;
    }

    if (!mongo) {
      throw new Error("connection not established");
    }

    logger.info("Mongo connected!");
    this._connection = mongo;
    return this._connection;
  }

  /**
   * Disconnects from MongoDb
   * @returns {Promise<void>}
   */
  // eslint-disable-next-line complexity
  public async disconnect(): Promise<void> {
    if (!this._connection) {
      throw new Error("MongoDB connection not yet initiated");
    }

    if (this._connection.readyState === 0) {
      throw new Error("MongoDB is disconnected");
    }

    if (this._connection.readyState === 3) {
      throw new Error("MongoDB is disconnecting");
    }

    const [connectionCloseError] = await safePromise(this._connection.close());

    if (connectionCloseError) {
      logger.error(connectionCloseError, "connectionCloseError");
      throw connectionCloseError;
    }
  }
}

export default MongoClient;
