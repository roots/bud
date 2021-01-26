// @ts-check
const {bud} = require('../../packages/bud')

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
 * Set public path
 */
bud.publicPath(bud.env.get('APP_PUBLIC'))

/**
 * Required extensions
 */
bud.use([
  require('@roots/bud-babel'),
  require('@roots/bud-react'),
  require('@roots/bud-postcss'),
  /**
   * Creates entrypoints.json for easier enqueues.
   */
  require('@roots/bud-entrypoints'),
  /**
   * Utilizes window variables for wordpress packages
   */
  require('@roots/bud-wordpress-externals'),
  /**
   * Adds consumed externals to wordpress.json manifest.
   */
  require('@roots/bud-wordpress-dependencies'),
  /**
   * Merges entrypoints.json and wordpress.json
   */
  require('@roots/bud-wordpress-manifests'),
])

/**
 * Enable proxying
 */
bud.proxy()

/**
 * Set entrypoints
 */
bud.entry('create-bud-wp-app', ['app.js', 'app.css'])

/**
 * Run build.
 */
bud.run()
