import type {Bud} from '@roots/bud-typings'
import type {PluginTarget, PluginOptions} from '@babel/core'

/**
 * Merge babel plugins
 */
export const setPlugins = function (
  this: Bud.Contract,
  plugins: Array<[PluginTarget, PluginOptions]>,
): Bud.Contract {
  this.build.items.set('babel.options.plugins', plugins)

  return this
}
