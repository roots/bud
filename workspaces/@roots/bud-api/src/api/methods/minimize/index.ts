import {cssMinimizerOptions} from './minimize.constants'
import {CssMinimizer} from './minimize.dependencies'
import {Framework} from './minimize.interface'

/**
 * Minimize function interface
 *
 * @param this - {@link @roots/bud-framework#Framework}
 * @param enabled - Should assets be minimized
 *
 * @public
 */
export interface minimize {
  (enabled?: boolean, options?: {css: any}): Framework
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
  enabled = true,
  options?: {css: any},
) {
  this as Framework

  enabled = enabled !== false

  this.hooks.on('build.optimization.minimize', () => enabled)

  this.hooks.on(
    'build.optimization.minimizer',
    (minimizer: any[]) => {
      minimizer.push(
        ...(minimizer.includes('...') ? [] : ['...']),
        new CssMinimizer({
          ...cssMinimizerOptions,
          ...(options?.css ?? {}),
        }),
      )

      return minimizer
    },
  )

  return this
}
