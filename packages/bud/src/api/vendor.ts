import {BudInterface} from '../Bud'
import {Options} from 'webpack'

/**
 * ## bud.vendor
 *
 * Enable bundling vendor modules separately from application code.
 *
 * ```js
 * bud.vendor()
 * ```
 */
export type Vendor = (
  this: BudInterface,
  options?: Options.CacheGroupsOptions,
) => BudInterface

const vendor: Vendor = function (options) {
  this.features.enable('splitChunks')

  options &&
    this.options.set(
      'webpack.optimization.splitChunks.cacheGroups.vendor',
      {
        ...this.options.get(
          'webpack.optimization.splitChunks.cacheGroups.vendor',
        ),
        ...options,
      },
    )

  return this
}

export {vendor as default}
