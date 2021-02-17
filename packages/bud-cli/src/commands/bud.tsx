import {yargs} from '@roots/bud-support'

import * as build from './build'
import * as publish from './publish'

/**
 * $bud
 */
const cli = yargs
  .command(build)
  .command(publish)
  .recommendCommands()
  .demandCommand(
    1,
    'You must specify a command. See `bud --help` for usage.\n',
  )
  .usage('\nBud \n\nbud [command] [options]')
  .version()
  .wrap(yargs.terminalWidth())
  .epilog('https://github.com/roots/bud').argv

export {cli as bud}
