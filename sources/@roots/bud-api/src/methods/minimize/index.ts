import {Bud} from '@roots/bud-framework'
import {ConfigError} from '@roots/bud-support/errors'

export type Parameters = [
  (`css` | `js` | Array<`css` | `js`> | boolean | Bud)?,
]

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
  if (value instanceof Bud) {
    this.minify.enable(true)
    this.minify.js.enable(true)
    this.minify.css.enable(true)
    return this
  }

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

  if (Array.isArray(value)) {
    value.map(key => {
      this.minify[key].enable(true)
    })
    return this
  }

  throw ConfigError.normalize(`Error in bud.minimize`, {
    details: `Invalid argument passed to bud.minimize. Value must be a boolean, string, or array of strings.`,
    docs: new URL(`https://bud.js.org/reference/bud.minimize`),
    thrownBy: import.meta.url,
  })
}
