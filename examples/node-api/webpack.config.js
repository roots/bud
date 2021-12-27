const {factory} = require('@roots/bud')

/**
 * For info on configuring webpack with a function or promise see
 * {@link https://webpack.js.org/configuration/configuration-types/#exporting-a-promise}
 */
module.exports = async env => {
  /**
   * Instantiate bud
   */
  const bud = await factory()

  bud.mode = env.production ? 'production' : 'development'

  /**
   * Set entrypoints and do other config as usual
   */
  bud.entry('app', 'index.js').minimize().splitChunks()

  /**
   * This is our final config object
   */
  return await bud.build.make()
}
