export interface SqlUrlComponentsInterface {
  username?: string;
  password?: string;
  database?: string;
  host: string;
  port?: number;
}

// eslint-disable-next-line complexity
export default function getSqlUrlComponents(sqlConnectionUrl: string): SqlUrlComponentsInterface[] {
  if (!sqlConnectionUrl) {
    return [];
  }

  const sqlDbNameSplit = sqlConnectionUrl.split('/');
  const database = sqlDbNameSplit[1];
  const sqlCredsHostSplit = sqlDbNameSplit[0].split('@');
  const hostsIndex = sqlCredsHostSplit.length - 1;
  const hosts = sqlCredsHostSplit[hostsIndex];
  let username: string, password: string;

  if (hostsIndex) {
    const sqlCreds = sqlCredsHostSplit[0].split(':');
    username = sqlCreds[0];
    password = sqlCreds[1];
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
