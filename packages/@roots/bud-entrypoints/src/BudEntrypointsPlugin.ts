import {Extension} from '@roots/bud-framework'
import {EntrypointsWebpackPlugin} from '@roots/entrypoints-webpack-plugin'

/**
 * BudEntrypointsPlugin interface
 *
 * @public
 */
export type BudEntrypointsPlugin = Extension.CompilerPlugin<
  EntrypointsWebpackPlugin,
  Record<string, any>
>

/**
 * BudEntrypointsPlugin
 *
 * @public
 */
export const BudEntrypointsPlugin: BudEntrypointsPlugin = {
  name: '@roots/bud-entrypoints',
  options: () => ({}),
  make: options => {
    return new EntrypointsWebpackPlugin(options.all())
  },
}
