#!/usr/bin/env node

const Bud = require('@roots/bud-cli')

new Bud.CLI({
  name: 'sage',
  projectUrl: 'https://github.com/roots/sage',
  commands: Bud.commands,
}).invoke()
