import {Bud} from '@roots/bud-framework'
import CssMinimizer from 'css-minimizer-webpack-plugin'
import {isUndefined} from 'lodash-es'

import {cssMinimizerOptions} from './minimize.constants.js'

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
export const minimize: minimize = function (input?, options?: {css: any}) {
  const app = this as Bud

  if (input === false) {
    app.hooks.on('build.optimization.minimize', false)
  }

  if (isUndefined(input) || input === true) {
    app.hooks.on('build.optimization.minimize', true)
  }

  app.hooks.on('build.optimization.minimizer', minimizer => {
    return [
      ...(minimizer ?? []),
      new CssMinimizer({
        ...cssMinimizerOptions,
        ...(options?.css ?? {}),
      }),
    ]
  })

  return app
}
