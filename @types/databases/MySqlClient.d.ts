import MySqlConnectionSingletonAbstractClass from "@helpers/MySqlConnectionSingletonAbstractClass";
export declare class MySqlClient extends MySqlConnectionSingletonAbstractClass {
    protected _name: string;
    protected _connectionUrl: string;
    protected _slaves: import("@utils/get-mysql-url-components").MySqlUrlComponentsInterface[];
}
export default MySqlClient;
