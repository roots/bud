#!/usr/bin/env node

const {CLI} = require('../lib/cjs/CLI')

new CLI({
  command: 'bud',
  projectUrl: 'https://github.com/roots/bud',
})
  .mast()
  .invoke()
