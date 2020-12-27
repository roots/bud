// @ts-check
/**
 * Example: React single page application
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const {bud} = require('@roots/bud')

/**
 * This is specific for the Bud monorepo only.
 *
 * You do not need to include this hook in your project
 * configuration file.
 */
bud.hooks.on('webpack.resolve.modules', modules => [
  // @ts-ignore
  ...modules,
  bud.fs.path.join(bud.fs.base, './../../../node_modules'),
])

/**
 * Extensions
 */
bud.use([
  '@roots/bud-babel',
  '@roots/bud-postcss',
  '@roots/bud-imagemin',
  '@roots/bud-react',
  '@roots/bud-library',
])

/**
 * Define `appName` variable used in components/index.js
 * Explicitly cast as a string to avoid errors.
 */
bud.define({
  appName: bud.string(bud.env.get('APP_TITLE')),
})

/**
 * Set HTML template
 */
bud.template({
  template: bud.project('public/index.html'),
})

/**
 * Set application source files.
 */
bud.entry('create-bud-app', ['app.js', 'global.css'])

/**
 * Production optimizations.
 */
bud.mode.is('production') &&
  bud.pipe([
    ({minify}) => minify(),
    ({vendor}) => vendor(),
    ({runtime}) => runtime(),
  ])

/**
 * Run build.
 */
bud.run()
