#!/usr/bin/env node
const Bud = require('@roots/bud-cli')
const Sage = require('../lib/cjs')

/**
 * Sage CLI
 */
new Bud.CLI({
  name: 'sage',
  projectUrl: 'https://github.com/roots/sage',
  app: Sage.sage,
  commands: [...Bud.commands, ...Sage.commands],
}).invoke()
