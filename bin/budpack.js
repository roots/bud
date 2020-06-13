#!/usr/bin/env node

process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'
process.on('unhandledRejection', err => {
  console.error(err)

  process.exit()
})

const React = require('react')
const importJsx = require('import-jsx')
const {render} = require('ink')
const meow = require('meow')
const Budpack = importJsx('./../src/cli')

/**
 * CLI
 */
const cli = meow(`
  Usage
    $ budpack dev
    $ budpack build

  Options
    --production

  Examples
    $ budpack dev
      ↪️  build with hmr and watch enabled

    $ budpack build
      ↪️  build with watch enabled

    $ budpack build --production
      ↪️  build for production
`)

render(
	React.createElement(Budpack, {cli})
)
