#!/usr/bin/env node
import {yargs} from '@roots/bud-support'
import * as build from './commands/build'
import * as publish from './commands/publish'

/**
 * $bud
 */
const cli = yargs
  .command(build)
  .command(publish)
  .recommendCommands()
  .demandCommand(1, 'Try using one of the above commands.')
  .usage('bud [command] [options]')
  .version()
  .wrap(yargs.terminalWidth())
  .showHelpOnFail(true)
  .epilog('https://github.com/roots/bud').argv

export {cli as bud}
module.exports = {bud: cli}
