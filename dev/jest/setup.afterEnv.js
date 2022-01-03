// @ts-check

const {Signale} = require('signale')
const {default: prettyFormat} = require('pretty-format')
const {noop} = require('lodash')

const signale = new Signale({scope: 'jest'})

global.console = {
  log: signale.log,
  warn: signale.warn,
  dir: (a, _o) => signale.log(prettyFormat(a, {})),
  info: signale.info,
  ...global.console,
}
