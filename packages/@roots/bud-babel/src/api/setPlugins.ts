import {Framework} from '@roots/bud-framework'
/**
 * Merge babel plugins
 */
export const setPlugins: Framework.Babel.SetPlugins = function (
  plugins,
) {
  this.build.set('items.babel.options.plugins', plugins)

  return this
}
