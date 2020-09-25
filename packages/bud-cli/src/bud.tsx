#!/usr/bin/env node

import {yargs} from '@roots/bud-support'
import * as commands from './commands'

yargs
  .command(commands.build)
  .command(commands.publish)
  .demandCommand(1, 'Try using one of the above commands.')
  .recommendCommands()
  .usage('\n$0 [command] [options]')
  .version()
  .wrap(yargs.terminalWidth())
  .showHelpOnFail(true)
  .epilog('https://github.com/roots/bud').argv
