const {Signale} = require('signale')
const {prettyFormat} = require('pretty-format')

const signale = new Signale({scope: 'jest'})

global.console = {
  log: signale.log,
  error: signale.error,
  warn: signale.warn,
  dir: (...args) => signale.log(args.map(prettyFormat)),
}
