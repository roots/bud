import {lodash} from '@roots/bud-support'

import {cssMinimizerOptions} from './minimize.constants'
import {CssMinimizer} from './minimize.dependencies'
import {Framework} from './minimize.interface'

const {isUndefined} = lodash

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
export const minimize: minimize = function (input?, options?: {css: any}) {
  const ctx = this as Framework

  if (input === false) {
    ctx.hooks.on('build.optimization.minimize', false)
  }

  if (isUndefined(input) || input === true) {
    ctx.hooks.on('build.optimization.minimize', true)
  }

  ctx.hooks.on('build.optimization.minimizer', (minimizer: any[]) => {
    minimizer.push(
      ...(minimizer.includes('...') ? [] : ['...']),
      new CssMinimizer({
        ...cssMinimizerOptions,
        ...(options?.css ?? {}),
      }),
    )

    return minimizer
  })

  return ctx
}
