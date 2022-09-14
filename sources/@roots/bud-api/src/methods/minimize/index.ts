import type {Bud} from '@roots/bud-framework'
import {isUndefined} from '@roots/bud-support/lodash-es'

/**
 * Minimize function interface
 *
 * @param this - {@link @roots/bud-framework#Framework}
 * @param enabled - Should assets be minimized
 *
 * @public
 */
export interface minimize {
  (enabled?: boolean, options?: {css: any}): Bud
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
export const minimize: minimize = function (enabled: boolean = true) {
  const app = this as Bud

  if (enabled === false) {
    app.hooks.on(`build.optimization.minimize`, false)
    app.extensions.get(`@roots/bud-terser`).disable()
    app.extensions.get(`@roots/bud-terser/css-minimizer`).disable()
  }

  if (isUndefined(enabled) || enabled === true) {
    app.hooks.on(`build.optimization.minimize`, true)
    app.extensions.get(`@roots/bud-terser`).enable()
    app.extensions.get(`@roots/bud-terser/css-minimizer`).enable()
  }

  return app
}
