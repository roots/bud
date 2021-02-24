#!/usr/bin/env node

const CLI = require('../lib/cjs/CLI').CLI
const commands = require('../lib/cjs/CLI/commands')

new CLI({
  command: 'bud',
  projectUrl: 'https://github.com/roots/bud',
  commands,
})
  .mast()
  .invoke()
