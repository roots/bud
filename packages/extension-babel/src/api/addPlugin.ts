import type {PluginTarget, PluginOptions} from '@babel/core'
import type Framework from '@roots/bud-typings'

/**
 * Merge babel plugins
 */
export const addPlugin = function (
  name: PluginTarget,
  opts?: PluginOptions,
): Framework.Bud.Contract {
  const plugin = [name]

  opts && plugin.push(opts)

  this.bud.build.items.merge('babel.options.plugins', [plugin])

  return this
}
