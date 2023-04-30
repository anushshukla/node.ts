import pino from "pino";
import getEnv from "@src/utils/get-env";
// import { dateHelper } from '@utils/date-helper';

const logger = pino({
  name: getEnv("APP_NAME") as string,
  level: getEnv("LOGGER_LEVEL", "info") as string,
  prettyPrint: getEnv("LOGGER_PRETTY", false)
    ? {
        colorize: true,
        errorLikeObjectKeys: ["err", "error"],
        errorProps: "",
        levelFirst: false,
        messageKey: "msg",
        levelKey: "level",
        messageFormat: false,
        timestampKey: "time",
        translateTime: false,
        ignore: "pid,hostname",
        hideObject: false,
        singleLine: false,
      }
    : false,
  messageKey: "message",
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

export default logger;
