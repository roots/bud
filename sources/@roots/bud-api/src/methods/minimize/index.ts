import type {Bud} from '@roots/bud-framework'

export type Parameters = [boolean?]

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
  this.hooks.on(`build.optimization.minimize`, value)

  this.terser?.enable(value)
  this.minimizeCss?.enable(value)

  this.success(`minimize`, value)

  return this
}
