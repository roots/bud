const bud = require('../packages/bud/lib')

bud.extensions
  .use('@roots/bud-postcss')
  .use('@roots/bud-wordpress-manifests')
  .use('@roots/bud-tailwindcss')

bud
  .tailwind({
    theme: {
      test: 'case',
    },
  })
  .entry('foo', ['foo.js', 'foo.scss'])
  .compile()
