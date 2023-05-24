import PgsqlConnectionSingletonAbstractClass from '@src/helpers/PgsqlConnectionSingletonAbstractClass';
import getMysqlUrlComponents from '@src/utils/get-sql-url-components';
import getEnv from '@utils/get-env';

export class PgsqlClient extends PgsqlConnectionSingletonAbstractClass {
  protected _name = 'default';
  protected _type = 'postgres';
  protected _connectionUrl = getEnv('MYSQL_URL') as string;
  protected _slaves = getMysqlUrlComponents(
    getEnv('MYSQL_REPLICA_URLS') as string
  );
}

export default PgsqlClient;
