const meow = require('meow')

/**
 * CLI
 */
const command = meow(`
  Usage
    $ budpack dev
    $ budpack build
    $ budpack build:production

  Examples
    $ budpack dev
      ↪️  build with hmr and watch enabled

    $ budpack build
      ↪️  build with watch enabled

    $ budpack production
      ↪️  build for production
`)

if (command?.input?.[0] == 'dev') {
  process.env.BABEL_ENV = 'development'
  process.env.NODE_ENV = 'development'
}

if (command?.input?.[0] == 'dev') {
  process.env.BABEL_ENV = 'production'
  process.env.NODE_ENV = 'production'
}

process.on('unhandledRejection', err => {
  console.error(err)

  process.exit()
})

export default command
