import {Bud} from '@roots/bud'
/**
 * Merge babel plugins
 */
export const setPlugins: Bud.Babel.SetPlugins = function (
  plugins,
) {
  this.build.set('items.babel.options.plugins', plugins)

  return this
}
