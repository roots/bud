import pino from 'pino'
import {argv} from 'yargs'

const log: any = argv.log
const destination: boolean | string =
  argv?.log && typeof argv.log == 'boolean' ? false : log

const logger = pino(
  {
    base: null,
    enabled: argv.hasOwnProperty('log') ? true : false,
    prettyPrint: {
      colorize: !destination ? true : false,
    },
  },
  destination,
)

export {logger}
