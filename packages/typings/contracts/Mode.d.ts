import {Framework} from './'
import {Webpack} from './'

/**
 * ## bud.mode
 *
 * Utility for working with the webpack compiler's mode setting.
 *
 * [🔗 Documentation on bud.mode](#)
 */
export declare interface Mode
  extends Framework.Service<Framework> {
  /**
   * ## bud.mode.mode
   *
   * Webpack compilation mode.
   */
  mode: Webpack.Configuration['mode']

  /**
   * ## bud.mode.ci
   *
   * Is CI mode enabled?
   */
  ci: boolean

  /**
   * ## bud.mode.get
   *
   * Returns the currently set mode.
   *
   * ### Usage
   *
   * ```js
   * bud.mode.get()
   * ```
   */
  get(): Webpack.Configuration['mode']

  /**
   * ## bud.mode.set
   *
   * Set the mode value.
   *
   * Accepted values: `production`, `development`, `none`
   *
   * ### Usage
   *
   * ```js
   * bud.mode.set('production')
   * ```
   */
  set(mode: Webpack.Configuration['mode']): Framework

  /**
   * ## bud.mode.is
   *
   * Returns `true` if webpack mode matches the mode passed to it.
   *
   * Returns `false` if it does not.
   *
   * ### Usage
   *
   * ```js
   * bud.mode.is('production')
   * // returns true if bud.mode.get() === 'production'
   * ```
   */
  is(check: Webpack.Configuration['mode']): boolean
}
