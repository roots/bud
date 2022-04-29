import type {Bud} from '@roots/bud-framework'
import {CriticalCssWebpackPlugin} from '@roots/critical-css-webpack-plugin'

/**
 * Extract critical CSS
 *
 * @example
 * ```js
 * app.critical({
 *  // ...
 * })
 * ```
 *
 * @public
 */
export interface critical {
  (
    this: Bud,
    userOptions: Partial<CriticalCssWebpackPlugin['options']>,
  ): Bud
}

/**
 * @public
 */
export const critical: critical = function (
  this: Bud,
  userOptions: CriticalCssWebpackPlugin['options'],
) {
  this.extensions.get('@roots/bud-criticalcss').setOptions(options => ({
    ...options,
    ...userOptions,
  }))

  return this
}
