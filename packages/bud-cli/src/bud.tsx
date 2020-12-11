#!/usr/bin/env node
import yargs from 'yargs'
import * as build from './commands/build'
import * as publish from './commands/publish'

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
  .usage('\nBud-CLI \n\nbud [command] [options]')
  .version()
  .wrap(yargs.terminalWidth())
  .epilog('https://github.com/roots/bud').argv

export {cli as bud}
module.exports = {bud: cli}
