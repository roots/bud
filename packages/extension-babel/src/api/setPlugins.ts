/**
 * Merge babel plugins
 */
export const setPlugins: Babel.Config = function (
  plugins: Babel.Plugin[],
) {
  this.bud.build.items.set('babel.options.plugins', plugins)

  return this
}
