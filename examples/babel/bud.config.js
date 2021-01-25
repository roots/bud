// @ts-check
const {bud} = require('./../../packages/bud')

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
  .use([require('@roots/bud-babel')])
  .entry('create-bud-app', ['app.js', 'global.css'])

bud.run()
