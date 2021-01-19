// @ts-check
const {bud} = require('@roots/bud')

/**
 * This is specific for the Bud monorepo only.
 *
 * You do not need to include this hook in your project
 * configuration file.
 */
bud.hooks.on('webpack.resolve.modules', modules => {
  return [...modules, bud.project('./../../node_modules')]
})

/**
 * Required extensions
 */
bud.use([
  require('@roots/bud-babel'),
  require('@roots/bud-react'),
  require('@roots/bud-postcss'),
  require('@roots/bud-entrypoints'),
])

/**
 * Replace bundled React with WP react in production
 */
bud.options.is('mode', 'production') &&
  require('@roots/bud-wordpress-manifests')

/**
 * Enable proxying
 */
bud.proxy()

/**
 * Set entrypoints
 */
bud.entry('app', ['app.js', 'app.css'])

/**
 * Run build.
 */
bud.run()
