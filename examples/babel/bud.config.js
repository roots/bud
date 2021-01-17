/**
 * Add to the top of your config for better intellisense.
 */
// @ts-check

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
bud.hooks.on('webpack.resolve.modules', modules => {
  return [...modules, bud.project('./../../node_modules')]
})

bud
  .use(['@roots/bud-babel', '@roots/bud-postcss'])
  .entry('create-bud-app', ['app.js', 'global.css'])
  .run()
