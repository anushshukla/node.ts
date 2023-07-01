import dotenv, { DotenvConfigOutput } from 'dotenv';
import getLogger from '@utils/get-logger';
import getRootPath from '@utils/get-root-path';

let envInit: DotenvConfigOutput;

const logger = getLogger(__filename);

// eslint-disable-next-line complexity
export default function loadEnv(): void {
  if (process.env.DOPPLER_INJECTED === 'true') {
    logger.info('process env initialized using doppler');
    return;
  }

  if (envInit) {
    return;
  }

  const path = `${getRootPath()}/.env`;
  logger.info(path, 'path');

  envInit = dotenv.config({
    path,
    encoding: 'utf8',
    debug: process.env.DEBUG === 'true',
  });

  logger.debug(envInit, 'envInit');

  if (envInit.error) {
    throw envInit.error;
  }
}
