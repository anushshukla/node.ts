import pino, { ChildLoggerOptions } from 'pino'
export declare const logger: import('pino').Logger<{
  name: string
  level: string
  prettyPrint:
    | false
    | {
        colorize: boolean
        errorLikeObjectKeys: string[]
        errorProps: string
        levelFirst: boolean
        messageKey: string
        levelKey: string
        messageFormat: boolean
        timestampKey: string
        translateTime: boolean
        ignore: string
        hideObject: boolean
        singleLine: boolean
      }
  messageKey: string
  formatters: {
    level: (label: string) => {
      level: string
    }
  }
  customLevels: {
    trace: number
    debug: number
    info: number
    warn: number
    error: number
    fatal: number
  }
  useOnlyCustomLevels: true
}>
export default function getLogger(
  filePath: string,
  options?: Omit<ChildLoggerOptions, 'key'>
): pino.Logger<ChildLoggerOptions>
