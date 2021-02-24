#!/usr/bin/env node

const CLI = require('../lib/cjs/CLI').CLI
const build = require('../lib/cjs/CLI/commands/build').command
const publish = require('../lib/cjs/CLI/commands/publish/publish')
  .command
const list = require('../lib/cjs/CLI/commands/publish/list')
  .command

new CLI({
  command: 'bud',
  projectUrl: 'https://github.com/roots/bud',
  commands: {
    build,
    publish,
    list,
  },
})
  .mast()
  .invoke()
