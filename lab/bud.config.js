/* eslint-disable @typescript-eslint/no-var-requires */
const bud = require('../packages/bud/lib')

bud.extensions
  .use('@roots/bud-eslint')

bud
  .entry('foo', ['foo.js'])
  .compile()
