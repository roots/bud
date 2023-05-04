import {Cli} from 'clipanion'

import CreateCommand from './commands/create.js'

const [node, app, ...args] = process.argv

const cli = new Cli({
  binaryLabel: `create-bud-app`,
  binaryName: `${node} ${app}`,
  binaryVersion: `1.0.0`,
})

cli.register(CreateCommand)
cli.runExit(args)
