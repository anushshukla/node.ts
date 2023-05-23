import { Connection } from "typeorm";
import ConnectionSingletonAbstractClass from "@helpers/ConnectionSingletonAbstractClass";
import { MySqlUrlComponentsInterface } from "@utils/get-mysql-url-components";
export default abstract class MySqlConnectionSingletonAbstractClass extends ConnectionSingletonAbstractClass<Connection> {
    protected _connection: Connection;
    protected abstract _name: string;
    protected abstract _connectionUrl: string;
    protected _slaves?: MySqlUrlComponentsInterface[];
    get connection(): Connection;
    connect(): Promise<Connection>;
    disconnect(): Promise<void>;
}
