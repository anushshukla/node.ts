import pino, { ChildLoggerOptions } from 'pino';
import getEnv from '@utils/get-env';
// import { dateHelper } from '@utils/date-helper';

export const logger = pino({
  name: getEnv('APP_NAME') as string,
  level: getEnv('LOGGER_LEVEL', 'debug') as string,
  prettyPrint: getEnv('LOGGER_PRETTY', false)
    ? {
        colorize: true,
        errorLikeObjectKeys: ['err', 'error'],
        errorProps: '',
        levelFirst: false,
        messageKey: 'msg',
        levelKey: 'level',
        messageFormat: false,
        timestampKey: 'time',
        translateTime: false,
        ignore: 'pid,hostname',
        hideObject: false,
        singleLine: false,
      }
    : false,
  messageKey: 'message',
  formatters: {
    level: (label: string) => ({ level: label }),
  },
  customLevels: {
    trace: 10,
    debug: 20,
    info: 30,
    warn: 40,
    error: 50,
    fatal: 60,
  },
  useOnlyCustomLevels: true,
  // timestamp: () =>
  // `,"time":"${dateHelper().generateCurrentUtc().getCurrentUtc()}"`
});

export default function getLogger(
  filePath: string,
  options: Omit<ChildLoggerOptions, 'key'> = {},
): pino.Logger<ChildLoggerOptions> {
  return logger.child({ key: filePath, ...options });
}
