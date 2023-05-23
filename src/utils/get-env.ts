type EnvValues = string | number | boolean | undefined;

/**
 * @param {string} key - A string param.
 * @param {EnvValue} [defaultValue] - An optional param to set default value
 * @returns {EnvValue} environment value fetched from the process environment
 */
export default function getEnv(
  key: string,
  defaultValue?: EnvValues
): EnvValues {
  const env = process.env[key];
  if (!env) {
    return defaultValue;
  }
  if (env.toLowerCase() === 'true') {
    return true;
  }
  if (env.toLowerCase() === 'false') {
    return false;
  }
  if (!isNaN(+env)) {
    return +env;
  }

  return env;
}
