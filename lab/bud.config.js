/**
 * @type {Framework.Bud}
 */
const {
  buildCache,
  entry,
  minify,
  run,
  use,
} = require('../packages/bud/lib')

use([
  '@roots/bud-babel',
  '@roots/bud-eslint',
  '@roots/bud-postcss',
  '@roots/bud-tailwindcss',
  '@roots/bud-react',
])

buildCache()
entry('foo', ['foo.js', 'foo.css'])
minify()
run()
