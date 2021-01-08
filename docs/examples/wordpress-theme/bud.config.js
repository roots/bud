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
  require('@roots/bud-babel'),
  require('@roots/bud-react'),
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
  bud =>
    bud.pipe([
      bud =>
        bud.use([require('@roots/bud-wordpress-manifests')]),
    ]),
  bud =>
    bud.pipe([
      bud => bud.use([require('@roots/bud-entrypoints')]),
      bud => bud.proxy(),
    ]),
)

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
