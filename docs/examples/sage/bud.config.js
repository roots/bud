const {bud} = require('@roots/bud-sage')

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

bud.entry('app', ['app.js', 'app.css']).run()
