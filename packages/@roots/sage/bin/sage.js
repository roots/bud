#!/usr/bin/env node

const BudCLI = require('@roots/bud-cli')

new BudCLI.CLI({
  command: 'sage',
  projectUrl: 'https://github.com/roots/sage',
  commands: {
    ...BudCLI.commands,
    build: require('../lib/cjs/commands/build'),
  },
})
  .mast()
  .invoke()
