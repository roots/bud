const bud = require('../packages/bud/lib')

bud.mode.set('production')

bud
  .extensions
    .use('@roots/bud-babel')
    .use('@roots/bud-postcss')
    .use('@roots/bud-sass')
    .use('@roots/bud-tailwindcss')
    .use('@roots/bud-purgecss')
    .use('@roots/bud-react')
    .use('@roots/bud-wordpress-manifests')

bud.purgecss({
  ...bud.presets.get('purgecss.wp'),
})

bud
  .entry('foo', ['foo.js', 'foo.scss'])
  .compile()
