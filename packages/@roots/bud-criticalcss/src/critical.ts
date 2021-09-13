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
interface critical {
  (
    this: Framework,
    userOptions: Partial<CriticalCssWebpackPlugin['options']>,
  ): Framework
}

const critical: critical = function (
  this: Framework,
  userOptions: CriticalCssWebpackPlugin['options'],
) {
  this.hooks.on(
    'extension/@roots/bud-criticalcss/options',
    (options: CriticalCssWebpackPlugin['options']) => ({
      ...userOptions,
      ...options,
    }),
  )

  return this
}

export {critical}
