/**
 * @type {Framework.Bud}
 */
const bud = require('../packages/bud/lib')

bud.use([
  '@roots/bud-babel',
  '@roots/bud-eslint',
  '@roots/bud-postcss',
  '@roots/bud-tailwindcss',
  '@roots/bud-react',
])

bud
  .buildCache()
  .entry('foo', ['foo.js', 'foo.css'])
  .minify()
  .run()
