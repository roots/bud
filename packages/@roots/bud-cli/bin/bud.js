#!/usr/bin/env node

const {CLI} = require('../lib/cjs/CLI')
const {commands} = require('../lib/cjs/commands')
const {bud: app} = require('@roots/bud')

new CLI({
  name: 'bud',
  projectUrl: 'https://github.com/roots/bud',
  app: app.bootstrap().register().boot(),
  commands,
}).invoke()
