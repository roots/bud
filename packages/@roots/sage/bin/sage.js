#!/usr/bin/env node

const {CLI, commands} = require('@roots/bud-cli')

new CLI({
  command: 'sage',
  projectUrl: 'https://github.com/roots/sage',
  commands: {
    ...commands,
    build: require('../lib/cjs/commands/build'),
  },
})
  .mast()
  .invoke()
