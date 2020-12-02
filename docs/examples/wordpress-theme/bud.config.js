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
 * Set public path of theme directory.
 */
bud.publicPath('/wp-content/themes/example/dist')

/**
 * Use babel and react extensions.
 */
bud.use(['@roots/bud-babel', '@roots/bud-react'])

/**
 * For production, we'll want to use the React included with WP.
 * @roots/bud-wordpress-manifests includes support for this aliasing.
 */
bud.mode.is('production') &&
  bud.use(['@roots/bud-wordpress-manifests'])

/**
 * But in development aliasing React breaks HMR. So, we'll use our own
 * copy of React when running the dev server.
 */
bud.mode.is('development') &&
  bud.use(['@roots/bud-entrypoints'])

bud.mode.is('development') &&
  bud.dev({
    host: 'localhost',
    port: 8000,
    proxy: {
      host: 'localhost',
      port: 3000,
    },
  })

/**
 * Set application source files.
 */
bud.entry('app', ['app.js', 'app.css'])

bud.mode.is('production') &&
  bud.vendor().runtime().hash().minify()

/**
 * Run build.
 */
bud.run()
