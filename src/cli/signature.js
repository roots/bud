const meow = require('meow')

/**
 * CLI
 */
const cli = meow(`
  Usage
    $ budpack dev
    $ budpack build
    $ budpack build:production

  Options
    --production

  Examples
    $ budpack dev
      ↪️  build with hmr and watch enabled

    $ budpack build
      ↪️  build with watch enabled

    $ budpack build:production
      ↪️  build for production
`)

if (cli.input && cli.input[0] && cli.input[0] == 'dev') {
  process.env.BABEL_ENV = 'development'
  process.env.NODE_ENV = 'development'
}

if (cli.input && cli.input[0] && cli.input[0] == 'dev') {
  process.env.BABEL_ENV = 'production'
  process.env.NODE_ENV = 'production'
}

process.on('unhandledRejection', err => {
  console.error(err)
  process.exit()
})

module.exports = cli
