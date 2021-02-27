#!/usr/bin/env node

const Bud = require('@roots/bud-cli')

new Bud.CLI({
  command: 'sage',
  projectUrl: 'https://github.com/roots/sage',
  commands: {
    ...Bud.commands,
    Build: require('../lib/cjs/commands/build').default,
  },
})
  .mast()
  .invoke()
