const bud = require('../packages/bud/lib')

bud.mode.set('production')

bud
  .entry('foo', ['foo.js', 'foo.scss'])
  .compile()
