import {Bud} from '@roots/bud-typings'
import type {PluginTarget, PluginOptions} from '@babel/core'

/**
 * Merge babel plugins
 */
export const mergePlugins = function (
  this: Bud.Contract,
  plugins: [PluginTarget, PluginOptions][],
): Bud.Contract {
  this.build.items.merge(
    'babel.options.plugins',
    plugins.map(plugin =>
      typeof plugin === 'object' ? plugin : [plugin],
    ),
  )

  return this
}
