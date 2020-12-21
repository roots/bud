import type {Framework} from '@roots/bud-typings'
import type {PluginTarget, PluginOptions} from '@babel/core'

/**
 * Merge babel plugins
 */
export const setPlugins = function (
  this: Framework,
  plugins: Array<[PluginTarget, PluginOptions]>,
): Framework {
  this.build.items.set('babel.options.plugins', plugins)

  return this
}
