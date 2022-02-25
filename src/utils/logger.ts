import pino, { LogFn, Logger } from 'pino';
import { dateHelper } from '@utils/date-helper';

type ILogger = Record<'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal', LogFn>

const pretty = require('pino-pretty')
let stream;

if (process.env.LOGGER_PRETTY === 'true') {
  stream = pretty({
    colorize: true,
    crlf: false,
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
    // The file or file descriptor (1 is stdout) to write to
    destination: 1,
    // Alternatively, pass a `sonic-boom` instance (allowing more flexibility):
    // destination: new SonicBoom({ dest: 'a/file', mkdir: true })
    // You can also configure some SonicBoom options directly
    sync: false, // by default we write asynchronously
    append: true, // the file is opened with the 'a' flag
    mdkdir: true, // create the target destination
    customPrettifiers: {}
  });
}

const parentLogger: ILogger = pino({
  level: process.env.LOGGER_LEVEL,
  messageKey: 'message',
  formatters: {
    level: (label) => ({ level: label })
  },
  customLevels: {
    trace: 10,
    debug: 20,
    info: 30,
    warn: 40,
    error: 50,
    fatal: 60
  },
  useOnlyCustomLevels: true,
  timestamp: () =>
    `,"time":"${dateHelper().generateCurrentUtc().getCurrentUtc()}"`
}, stream);

const getLogger = (fileRelativePath: string) =>
  (parentLogger as Logger).child({ fileRelativePath });

export default getLogger;

export { parentLogger };
