import {Framework} from '@roots/bud-typings'
import {PluginTarget, PluginOptions} from '@babel/core'

/**
 * Merge babel plugins
 */
export const setPresets = function (
  this: Framework,
  presets: Array<[PluginTarget, PluginOptions]>,
): Framework {
  this.build.set('items.babel.options.presets', presets)

  return this
}
