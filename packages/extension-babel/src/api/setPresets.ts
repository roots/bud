import {Bud} from '@roots/bud-typings'
import {PluginTarget, PluginOptions} from '@babel/core'

/**
 * Merge babel plugins
 */
export const setPresets = function (
  this: Bud.App,
  presets: Array<[PluginTarget, PluginOptions]>,
): Bud.App {
  this.build.items.set('babel.options.presets', presets)

  return this
}
