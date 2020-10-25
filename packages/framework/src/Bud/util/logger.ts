import pino from 'pino'
import {argv} from 'yargs'

/**
 * CLI arg for log might be:
 * - a boolean (whether or not to log at all)
 * - a string (relpath to output file for logger)
 */
const log: boolean | string = argv.log as boolean | string

/**
 * Ducktype the log argv
 */
const destination: boolean | string =
  argv?.log && typeof argv.log == 'boolean' ? false : log

/**
 * Instantiate the logger.
 */
const logger: pino.Logger = pino(
  {
    base: null,
    enabled: argv.hasOwnProperty('log') ? true : false,
    prettyPrint: {
      colorize: !destination ? true : false,
    },
  },
  pino.destination(),
)


export {logger as default}
