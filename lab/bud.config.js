/* eslint-disable @typescript-eslint/no-var-requires */
// @ts-check
const bud = require('../packages/bud/lib')

bud.extensions
  .use('@roots/bud-sass')
  .use('@roots/bud-eslint')

bud.entry('foo', 'foo.js').compile()
