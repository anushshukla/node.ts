import logger from '@utils/logger';

const getConfig = (envName: string) => {
    const envValue = process.env[envName];
    if (typeof envValue === 'undefined') {
        logger.error(`${envName} environment variable is undefined`);
    }
}