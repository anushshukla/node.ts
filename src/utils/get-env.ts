type EnvValues = string | number | boolean | undefined | any;

/**
 * @param {string} key - A string param.
 * @param {EnvValue} [defaultValue] - An optional param to set default value
 * @returns {EnvValue} environment value fetched from the process environment
 */
// eslint-disable-next-line complexity
export default function getEnv<T = EnvValues>(key: string, defaultValue?: T): T {
  const env = process.env[key];
  if (!env) {
    return defaultValue as T;
  }
  if (env.toLowerCase() === 'true') {
    return true as T;
  }
  if (env.toLowerCase() === 'false') {
    return false as T;
  }
  if (!isNaN(+env)) {
    return +env as T;
  }

  return env as T;
}
