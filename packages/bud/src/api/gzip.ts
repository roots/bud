import {Loose} from '@roots/bud-framework'
import {BudInterface} from '../Bud'

/**
 * ## bud.gzip
 *
 * Apply gzip compression to static assets.
 *
 * ```js
 * bud.gzip()
 * ```
 *
 * ```js
 * bud.gzip({
 *  test: /\.js$|\.css$|\.html$/,
 *  minRatio: 0.8,
 * })
 * ```
 */
export type Gzip = (
  this: BudInterface,
  options?: Loose,
) => BudInterface

const gzip: Gzip = function (options?) {
  this.features.set('gzip', true)

  options &&
    this.options.merge(
      ['webpack', 'plugins', 'compression', 'gzip'],
      options,
    )

  return this
}

export {gzip as default}
