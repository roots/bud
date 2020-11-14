import {Bud} from '@roots/bud-typings'
import type {PluginTarget, PluginOptions} from '@babel/core'

/**
 * Merge babel plugins
 */
export const mergePlugins = function (
  this: Bud.App,
  plugins: [PluginTarget, PluginOptions][],
): Bud.App {
  this.build.items.merge(
    'babel.options.plugins',
    plugins.map(plugin =>
      typeof plugin === 'object' ? plugin : [plugin],
    ),
  )

  return this
}
