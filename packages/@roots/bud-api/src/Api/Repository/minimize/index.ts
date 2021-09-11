import type {Framework} from '@roots/bud-framework'

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
interface minimize {
  (enabled?: boolean): Framework
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
const minimize: minimize = function (enabled = true) {
  this.hooks.on('build/optimization/minimize', () => enabled)

  return this
}

export {minimize as default}
