import mongoose, { Connection } from "mongoose";
import ConnectionSingletonAbstractClass from "@helpers/ConnectionSingletonAbstractClass";
export declare class MongoClient extends ConnectionSingletonAbstractClass<Connection> {
    protected _connection: mongoose.Connection;
    get connection(): Connection;
    connect(): Promise<Connection>;
    disconnect(): Promise<void>;
}
export default MongoClient;
