/**
 * @type {Framework.Bud}
 */
const {
  use,
  library,
  entry,
  minify,
  run,
} = require('../packages/bud/lib')

use([
  '@roots/bud-babel',
  '@roots/bud-eslint',
  '@roots/bud-postcss',
  '@roots/bud-wordpress-manifests',
  '@roots/bud-react',
])

library(['react', 'react-dom'])

entry('foo', ['foo.js'])

minify()

run()
