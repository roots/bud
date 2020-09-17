import {Loose} from '@roots/bud-framework'
import BudInterface from '../Bud'

/**
 * ## bud.brotli
 *
 * Apply brotli compression to static assets.
 *
 * ```js
 * bud.brotli()
 * ```
 *
 * ```js
 * bud.brotli({
 *   compressionOptions: {
 *     level: 11,
 *   },
 *   threshold: 10240,
 *   minRatio: 0.8,
 *   deleteOriginalAssets: false,
 * })
 * ```
 */
export type Brotli = (
  this: BudInterface,
  options?: Loose,
) => BudInterface

const brotli: Brotli = function (options?) {
  this.features.set('brotli', true)

  options &&
    this.options.merge(
      'webpack.plugins.compression.brotli',
      options,
    )

  return this
}

export {brotli as default}
