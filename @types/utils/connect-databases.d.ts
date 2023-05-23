import MySqlClient from '@databases/MySqlClient';
import MongoClient from '@databases/MongoClient';
import RedisClient from '@databases/RedisClient';
declare const dbConnectorMapper: {
    mysql: typeof MySqlClient;
    mongo: typeof MongoClient;
    redis: typeof RedisClient;
};
export type DbConnectListType = keyof typeof dbConnectorMapper;
export declare const allDbConnectorNames: ("mongo" | "mysql" | "redis")[];
export default function connectDatabases(dbConnectorNames: DbConnectListType[]): Promise<void>;
export {};
