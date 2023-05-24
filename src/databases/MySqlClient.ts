import SqlConnectionSingletonAbstractClass from '@src/helpers/SqlConnectionSingletonAbstractClass';
import getMysqlUrlComponents from '@src/utils/get-sql-url-components';
import getEnv from '@utils/get-env';

export class MySqlClient extends SqlConnectionSingletonAbstractClass {
  protected _name = 'default';
  protected _type = 'mysql';
  protected _connectionUrl = getEnv('MYSQL_URL') as string;
  protected _slaves = getMysqlUrlComponents(getEnv('MYSQL_REPLICA_URLS') as string);
}

export default MySqlClient;
