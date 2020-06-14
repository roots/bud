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

export default command
