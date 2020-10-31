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
    '@roots/bud-purgecss',
    '@roots/bud-wordpress-manifests',
    '@roots/bud-vue',
  ])
  .template()
  .when(
    bud.mode.is('production'),
    () => {
      bud.minify()
      bud.gzip()
    },
    () => bud.dev(),
  )
  .entry('bar', ['bar.js'])
  .run()
