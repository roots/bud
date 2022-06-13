import type {Bud} from '@roots/bud-framework'
import type {Options} from '@roots/critical-css-webpack-plugin'

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
  (this: Bud, userOptions: Partial<Options>): Bud
}

/**
 * @public
 */
export function critical(this: Bud, userOptions: Partial<Options>): Bud {
  this.extensions.get('@roots/bud-criticalcss').setOptions(options => ({
    ...options,
    ...userOptions,
  }))

  return this
}
