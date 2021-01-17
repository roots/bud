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
  bud.fs.path.join(bud.fs.base, './../../node_modules'),
])

// Use babel and react extensions.
bud.use([
  '@roots/bud-babel',
  '@roots/bud-react',
  '@roots/bud-entrypoints',
])

/**
 * For production, we'll want to use the React included with WP.
 * @roots/bud-wordpress-manifests will alias imports to their wp equivalencies.
 *
 * For development, aliasing React breaks HMR. So, we'll use our own
 * copy of React when running the dev server.
 */
bud.when(bud.options.is('mode', 'development'), bud =>
  bud.use(['@roots/bud-wordpress-externals']).proxy(),
)

/**
 * Set entrypoints
 */
bud.entry('app', ['app.js', 'app.css'])

/**
 * Run build.
 */
bud.run()
