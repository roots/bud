import {Cli} from 'clipanion'

import CreateCommand from './commands/create.js'

const [, , ...args] = process.argv

const cli = new Cli({
  binaryLabel: `create-bud-app`,
  binaryName: `npx @roots/create-bud-app`,
  binaryVersion: `1.0.0`,
})

cli.register(CreateCommand)
cli.runExit(args)
