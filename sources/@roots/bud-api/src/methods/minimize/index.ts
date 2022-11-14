import type {Bud} from '@roots/bud-framework'

export type Parameters = [(boolean | ((value?: boolean) => boolean))?]

/**
 * Minimize function interface
 *
 * @public
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
 *
 * @public
 */
export const minimize: minimize = function (this: Bud, value = true) {
  this.hooks.on(`build.optimization.minimize`, value)

  if (this.hooks.filter(`build.optimization.minimize`)) {
    this.extensions.get(`@roots/bud-terser`).enable()
    this.extensions.get(`@roots/bud-terser/css-minimizer`).enable()
  } else {
    this.extensions.get(`@roots/bud-terser`).disable()
    this.extensions.get(`@roots/bud-terser/css-minimizer`).disable()
  }

  this.success(`minimize ${value ? `enabled` : `disabled`}`)

  return this
}
