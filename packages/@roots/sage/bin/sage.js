#!/usr/bin/env node

const budCLI = require('@roots/bud-cli').CLI

const sageCLI = new budCLI()

sageCLI.command = `sage`
sageCLI.epilog = `https://github.com/roots/sage`
sageCLI.commands = [
  require('../lib/cjs/commands/build'),
  require('../lib/cjs/commands/publish'),
]

sageCLI.invoke()
