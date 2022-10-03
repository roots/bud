import type {Bud} from '@roots/bud-framework'

/**
 * Minimize function interface
 *
 * @param this - {@link @roots/bud-framework#Framework}
 * @param enabled - Should assets be minimized
 *
 * @public
 */
export interface minimize {
  (
    enabled?: boolean | ((value?: boolean) => boolean),
    options?: {css: any},
  ): Bud
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
export const minimize: minimize = function (
  value: boolean | ((value?: boolean) => boolean) = true,
) {
  const app = this as Bud

  app.hooks.on(`build.optimization.minimize`, value)

  if (app.hooks.filter(`build.optimization.minimize`)) {
    app.extensions.get(`@roots/bud-terser`).enable()
    app.extensions.get(`@roots/bud-terser/css-minimizer`).enable()
  } else {
    app.extensions.get(`@roots/bud-terser`).disable()
    app.extensions.get(`@roots/bud-terser/css-minimizer`).disable()
  }

  app.success(`minimize ${value ? `enabled` : `disabled`}`)

  return app
}
