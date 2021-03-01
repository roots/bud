#!/usr/bin/env node

const Bud = require('@roots/bud-cli')
const {sage: app} = require('../lib/cjs')

/**
 * Sage CLI
 */
new Bud.CLI({
  name: 'sage',
  app,
  projectUrl: 'https://github.com/roots/sage',
  commands: Bud.commands,
}).invoke()
