import {Bud} from '@roots/bud-typings'
import {PluginTarget, PluginOptions} from '@babel/core'

/**
 * Merge babel plugins
 */
export const setPresets = function (
  this: Bud,
  presets: Array<[PluginTarget, PluginOptions]>,
): Bud {
  this.build.items.set('babel.options.presets', presets)

  return this
}
