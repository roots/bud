/**
 * @type {Framework.Bud}
 */
const bud = require('../packages/bud/lib')


bud.extensions
  .use('@roots/bud-babel')
  .use('@roots/bud-eslint')
  .use('@roots/bud-postcss')
  .use('@roots/bud-sass')
  .use('@roots/bud-tailwindcss')
  .use('@roots/bud-purgecss')
  .use('@roots/bud-wordpress-manifests')
  .use('@roots/bud-vue')
  .next()

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
