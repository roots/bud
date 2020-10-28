const bud = require('../packages/bud/lib')

bud
  .mode.set('development')

bud
  .extensions
    .use('@roots/bud-babel')
    .use('@roots/bud-jsx')
    .use('@roots/bud-postcss')
    .use('@roots/bud-sass')
    .use('@roots/bud-wordpress-manifests')
    .use('@roots/bud-tailwindcss')

bud
  .entry('foo', ['foo.js', 'foo.scss'])
  .compile()
