export default function getEnv(
key: string,
defaultValue?: string | number | boolean | undefined
): string | number | boolean | undefined {
    const env = process.env[key];
    if (!env) {
        return defaultValue;
    }
    if (env.toLowerCase() === "true") {
        return true;
    }
    if (env.toLowerCase() === "false") {
        return false;
    }
    if (!isNaN(+env)) {
        return +env;
    }
    return env;
}
