import {Extension} from '@roots/bud-framework'
import {
  EntrypointsWebpackPlugin,
  Options,
} from '@roots/entrypoints-webpack-plugin'

/**
 * BudEntrypointsExtension interface
 *
 * @public
 */
export type BudEntrypointsExtension = Extension.Plugin<
  EntrypointsWebpackPlugin,
  Options
>

/**
 * BudEntrypointsExtension
 *
 * @public
 */
export const BudEntrypointsExtension: BudEntrypointsExtension = {
  label: '@roots/bud-entrypoints',
  options: () => ({emitHtml: false}),
  make: options => new EntrypointsWebpackPlugin(options.all()),
}
