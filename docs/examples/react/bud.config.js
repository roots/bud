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
  ...modules,
  bud.fs.path.join(bud.fs.base, './../../../node_modules'),
])

/**
 * Extensions
 */
bud.use([
  '@roots/bud-postcss',
  '@roots/bud-babel',
  '@roots/bud-react',
])

/**
 * Set application source files.
 */
bud.entry('create-bud-app', ['app.js', 'global.css'])

/**
 * Define `appName` variable used in components/index.js
 * Explicitly cast as a string to avoid errors.
 */
bud.define({
  appName: bud.string(bud.env.get('APP_TITLE')),
})

/**
 * Production optimizations.
 */
if (bud.mode.is('production')) {
  bud.minify()
  bud.vendor()
  bud.runtime()
}

/**
 * Set HTML template
 */
bud.template({
  template: bud.project('public/index.html'),
})

/**
 * Run build.
 */
bud.run()
