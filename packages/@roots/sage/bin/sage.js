#!/usr/bin/env node

const {sage: app} = require('../lib/cjs')
const Bud = require('@roots/bud-cli')

new Bud.CLI({
  name: 'sage',
  app,
  projectUrl: 'https://github.com/roots/sage',
  commands: Bud.commands,
}).invoke()
