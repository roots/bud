import {cssMinimizerOptions} from './minimize.constants'
import {CssMinimizer} from './minimize.dependencies'
import {Framework} from './minimize.interface'

/**
 * Minimize function interface
 *
 * @param this - {@link @roots/bud-framework#Framework}
 * @param enabled - Should assets be minimized
 *
 * @hook build/optimization/minimize
 *
 * @public @config
 */
export interface minimize {
  (
    this: Framework,
    enabled?: boolean,
    options?: {css: any},
  ): Framework
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
 * @public @config
 */
export const minimize: minimize = function (
  enabled = true,
  options?: {css: any},
) {
  enabled = enabled ?? true
  this.hooks.on('build/optimization/minimize', () => enabled)

  if (enabled) {
    this.hooks.on('build/optimization/minimizer', minimizer => {
      minimizer.push(
        new CssMinimizer({
          ...cssMinimizerOptions,
          ...(options?.css ?? {}),
        }),
      )
      return minimizer
    })
  }

  return this
}
