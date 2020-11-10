/**
 * @type {Framework.Bud}
 */
const bud = require('../packages/bud/lib')

bud
  .use([
    '@roots/bud-babel',
    '@roots/bud-eslint',
    '@roots/bud-postcss',
    '@roots/bud-sass',
    '@roots/bud-tailwindcss',
    '@roots/bud-wordpress-manifests',
    '@roots/bud-react',
  ])

  .library(['react', 'react-dom'])

  .entry('foo', ['foo.js', 'foo.scss'])

  .minify()

  .run()

/* console.log(bud.disk.get('@roots/bud-eslint').get())
console.log(bud.extensions.get('@roots/bud-eslint').all())
 */
