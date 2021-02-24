#!/usr/bin/env node

const {CLI} = require('@roots/bud-cli')

new CLI({
  command: 'sage',
  projectUrl: 'https://github.com/roots/sage',
  commands: {
    build: require('../lib/cjs/commands/build').command,
    build: require('../lib/cjs/commands/publish/publish')
      .command,
    build: require('../lib/cjs/commands/publish/list').command,
  },
})
  .mast()
  .invoke()
