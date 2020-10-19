/* eslint-disable @typescript-eslint/no-var-requires */
const bud = require('../packages/bud/lib')

bud.extensions
  .use('@roots/bud-sass')
  .use('@roots/bud-eslint')

bud
  .entry('foo', ['foo.js', 'foo.scss'])

bud.build.config.set('watch', true)
bud.compile()
