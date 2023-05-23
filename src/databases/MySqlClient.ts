import MySqlConnectionSingletonAbstractClass from '@helpers/MySqlConnectionSingletonAbstractClass';
import getMysqlUrlComponents from '@utils/get-mysql-url-components';
import getEnv from '@utils/get-env';

export class MySqlClient extends MySqlConnectionSingletonAbstractClass {
  protected _name = 'default';
  protected _connectionUrl = getEnv('MYSQL_URL') as string;
  protected _slaves = getMysqlUrlComponents(
    getEnv('MYSQL_REPLICA_URLS') as string
  );
}

export default MySqlClient;
