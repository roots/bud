import {Framework} from '@roots/bud-framework'
import {isBoolean} from 'lodash'

declare module '@roots/bud-framework' {
  export interface Framework {
    /**
     * ## bud.minimize  [💁 Fluent]
     *
     * `bud.minimize` enables minification of built assets.
     *
     * ### Usage
     *
     * Enable:
     *
     * ```js
     * bud.minimize()
     * ```
     *
     * Explicitly disable:
     *
     * ```js
     * bud.minimize(false)
     * ```
     *
     * Explicitly enable:
     *
     * ```js
     * bud.minimize(true)
     * ```
     */
    minimize: Minimize
  }
}

type Minimize = (enabled?: boolean) => Framework

export const minimize: Minimize = function (enabled?: boolean) {
  const value = isBoolean(enabled) ? enabled : true

  this.hooks.on('build/optimization/minimize', () => value)

  return this
}
