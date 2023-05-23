export interface MySqlUrlComponentsInterface {
    username?: string;
    password?: string;
    database?: string;
    host: string;
    port?: number;
}
export default function getMysqlUrlComponents(mysqlConnectionUrl: string): MySqlUrlComponentsInterface[];
