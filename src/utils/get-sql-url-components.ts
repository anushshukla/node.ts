export interface SqlUrlComponentsInterface {
  username?: string;
  password?: string;
  database?: string;
  host: string;
  port?: number;
}

export default function getSqlUrlComponents(mysqlConnectionUrl: string): SqlUrlComponentsInterface[] {
  const mysqlDbNameSplit = mysqlConnectionUrl.split('/');
  const database = mysqlDbNameSplit[1];
  const mysqlCredsHostSplit = mysqlDbNameSplit[0].split('@');
  const hostsIndex = mysqlCredsHostSplit.length - 1;
  const hosts = mysqlCredsHostSplit[hostsIndex];
  let username: string, password: string;

  if (hostsIndex) {
    const mysqlCreds = mysqlCredsHostSplit[0].split(':');
    username = mysqlCreds[0];
    password = mysqlCreds[1];
  }

  return hosts.split(',').map(host => {
    const [domain, port] = host.split(':');
    return {
      database,
      username,
      password,
      host: domain,
      port: port ? +port : undefined,
    };
  });
}
