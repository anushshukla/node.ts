import MySqlClient from '@databases/MySqlClient';
import PgsqlClient from '@databases/PgsqlClient';
import MongoClient from '@databases/MongoClient';
import RedisClient from '@databases/RedisClient';

const dbConnectorMapper = {
  psql: PgsqlClient,
  mysql: MySqlClient,
  mongo: MongoClient,
  redis: RedisClient,
};

export type DbConnectListType = keyof typeof dbConnectorMapper;
export const allDbConnectorNames = Object.keys(
  dbConnectorMapper
) as DbConnectListType[];

export default async function connectDatabases(
  dbConnectorNames: DbConnectListType[]
): Promise<void> {
  for (const dbConnectorName of dbConnectorNames) {
    const DbClient = dbConnectorMapper[dbConnectorName];
    // eslint-disable-next-line no-await-in-loop
    await DbClient.getInstance().connect();
  }
}
