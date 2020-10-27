const bud = require('../packages/bud/lib')

bud
  .mode.set('development')

  .extensions
    .use('@roots/bud-babel')
    .use('@roots/bud-postcss')
    .use('@roots/bud-sass')
    .use('@roots/bud-wordpress-manifests')
    .use('@roots/bud-tailwindcss')
    .next()

  .entry('foo', ['foo.js', 'foo.scss'])
  .compile()
