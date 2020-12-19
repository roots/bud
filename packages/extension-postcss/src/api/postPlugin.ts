import {Bud} from '@roots/bud-typings'
import {AcceptedPlugin} from '../types'

export const postPlugin: PostPlugin = function (
  plugin,
  options = {},
) {
  this.build.items.merge(
    'postcss.options.postcssOptions.plugins',
    [plugin, options],
  )

  return this
}

/**
 * ## bud.postPlugin
 *
 * Add a postcss plugin.
 *
 * ### Usage
 *
 * ```js
 * bud.postPlugin(MyPlugin, {plugin: 'options'})
 * ```
 */
export type PostPlugin = (
  this: Bud,
  plugin: AcceptedPlugin,
  options?: unknown,
) => Bud
