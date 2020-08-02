import pino from 'pino'
import {argv} from 'yargs'

const logger = pino({
  base: null,
  dest: argv['log'] && (argv['log'] as string) ? argv['log'] : false,
  enabled: argv['log'] ? true : false,
  prettyPrint: {
    colorize: true,
  },
})

export {logger}
