#!/usr/bin/env node

const {CLI} = require('@roots/bud-cli')

new CLI({
  command: 'sage',
  projectUrl: 'https://github.com/roots/sage',
})
  .mast()
  .invoke()
