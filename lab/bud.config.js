/**
 * @type {Framework.Bud}
 */
const bud = require('../packages/bud/lib')

bud
  .use([
    '@roots/bud-babel',
    '@roots/bud-eslint',
    '@roots/bud-postcss',
    '@roots/bud-wordpress-manifests',
    '@roots/bud-react',
    '@roots/bud-vue',
  ])

  .library(['react', 'react-dom'])

  .entry('foo', ['foo.js'])

  .minify()

  // console.log(bud.extensions.get('@roots/bud-babel').boot(bud))
  .run()
