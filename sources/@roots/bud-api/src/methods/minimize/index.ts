import type {Bud} from '@roots/bud-framework'

export type Parameters = [(`css` | `js` | Array<`css` | `js`> | boolean)?]

/**
 * Minimize function interface
 */
export interface minimize {
  (...parameters: Parameters): Bud
}

/**
 * Enables minification of built assets.
 *
 * @example
 * Enable:
 *
 * ```js
 * bud.minimize()
 * ```
 *
 * @example
 * Explicitly disable:
 *
 * ```js
 * bud.minimize(false)
 * ```
 *
 * @example
 * Explicitly enable:
 *
 * ```js
 * bud.minimize(true)
 * ```
 */
export const minimize: minimize = function (this: Bud, value = true) {
  if (typeof value == `boolean`) {
    this.minify.enable(value)
    this.minify.js.enable(value)
    this.minify.css.enable(value)
    return this
  }

  this.minify.enable(true)

  if (typeof value == `string`) {
    this.minify[value].enable(true)
    return this
  }

  value.map(key => this.minify[key].enable(true))
  return this
}
