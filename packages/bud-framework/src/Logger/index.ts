import {pino, yargs} from '@roots/bud-support'
import {Logger} from '@roots/bud-typings'

/**
 * CLI arg for log might be:
 * - a boolean (whether or not to log at all)
 * - a string (relpath to output file for logger)
 */
const log: boolean | string = yargs.argv.log as boolean | string

/**
 * Ducktype the log argv
 */
const destination: boolean | string =
  yargs.argv?.log && typeof yargs.argv.log == 'boolean'
    ? false
    : log

/**
 * Instantiate the logger.
 */
const Logger: Logger = pino(
  {
    base: null,
    enabled: yargs.argv.hasOwnProperty('log') ? true : false,
    prettyPrint: {
      colorize: !destination ? true : false,
    },
  },
  pino.destination(),
)

export default Logger
