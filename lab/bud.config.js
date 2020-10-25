const bud = require('../packages/bud/lib')

bud.extensions
  .use('@roots/bud-wordpress-manifests')

bud
  .entry('foo', ['foo.js', 'foo.scss'])
  .compile()
