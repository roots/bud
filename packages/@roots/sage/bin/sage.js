#!/usr/bin/env node

const Bud = require('@roots/bud-cli')
const source = require('../lib/cjs').source

new Bud.CLI({
  command: 'sage',
  projectUrl: 'https://github.com/roots/sage',
  commands: {
    ...Bud.commands,
    build: {
      ...Bud.commands.build,
      handler: () => {
        try {
          source.preflight()
          source.isStatic() ? source.json() : source.api()
        } catch (error) {
          Error(error.toString(), `Error`)
        }
      },
    },
  },
})
  .mast()
  .invoke()
