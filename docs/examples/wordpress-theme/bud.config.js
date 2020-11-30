/**
 * Example: React single page application
 */

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
 * Use babel and react extensions.
 */
bud.use([
  '@roots/bud-babel',
  '@roots/bud-react',
  '@roots/bud-wordpress-manifests',
])

/**
 * Set application source files.
 */
bud.entry('app', ['app.js'])

/**
 * Production optimizations.
 */
if (bud.mode.is('production')) {
  bud.minify()
  bud.vendor()
  bud.runtime()
}

/**
 * Run build.
 */
bud.run()
