// @ts-check
// eslint-disable-next-line @typescript-eslint/no-var-requires
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
  .use('@roots/bud-sass')
  .entry('app', ['app.js', 'app.scss'])
  .run()
