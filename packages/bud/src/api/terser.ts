import {BudInterface} from '../'
import {TerserPluginOptions} from 'terser-webpack-plugin'

/**
 * ## bud.terser
 *
 * Optimize build with terser.
 *
 * ```js
 * bud.terser({
 *  parse: {
 *   ecma: 8,
 *  },
 *  compress: {
 *    ecma: 5,
 *    warnings: false,
 *    comparisons: false,
 *    inline: 2,
 *  },
 * })
 * ```
 */
export type Terser = (
  this: BudInterface,
  options: TerserPluginOptions,
) => BudInterface

const terser: Terser = function (
  this: BudInterface,
  options: TerserPluginOptions,
) {
  if (options) {
    this.options.set('plugins.terser', {
      ...this.options.get('plugins.terser'),
      ...options,
    })
  }

  return this
}

export {terser as default}
