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

// Use babel and react extensions.
bud.use([
  '@roots/bud-babel',
  '@roots/bud-imagemin',
  '@roots/bud-react',
])

/**
 * For production, we'll want to use the React included with WP.
 * @roots/bud-wordpress-manifests will alias imports to their wp equivalencies.
 *
 * For development, aliasing React breaks HMR. So, we'll use our own
 * copy of React when running the dev server.
 */
bud.when(
  bud.mode.is('production'),
  bud => bud.use(['@roots/bud-wordpress-manifests']),
  bud => bud.use(['@roots/bud-entrypoints']),
)

/**
 * Set theme dist path for enqueues.
 */
bud.publicPath('/wp-content/themes/example/dist')

/**
 * In development, proxy on this port.
 */
bud.mode.is('development') && bud.proxy()

/**
 * Set entrypoints
 */
bud.entry('app', ['app.js', 'app.css'])

/**
 * Optimize for production.
 */
bud.mode.is('production') &&
  bud.vendor().runtime().hash().minify()

/**
 * Run build.
 */
bud.run()
