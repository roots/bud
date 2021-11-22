import type {Framework} from '@roots/bud-framework'
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
 */
export interface critical {
  (
    this: Framework,
    userOptions: Partial<CriticalCssWebpackPlugin['options']>,
  ): Framework
}

export const critical: critical = function (
  this: Framework,
  userOptions: CriticalCssWebpackPlugin['options'],
) {
  this.extensions
    .get('@roots/bud-criticalcss')
    .options.merge(userOptions)

  return this
}
