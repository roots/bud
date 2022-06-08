import {isBoolean, isFunction} from 'lodash-es'

import type {Bud} from '../bud.js'

/**
 * @public
 */
export interface when {
  (
    test: ((app: Bud) => boolean) | boolean,
    trueCase: (app: Bud) => any,
    falseCase?: (app: Bud) => any,
  ): Bud
}

/**
 * Executes a function if a given test is `true`.
 *
 * @remarks
 * - The first parameter is the conditional check.
 * - The second parameter is the function to run if `true`.
 * - The third parameter is optional; executed if the conditional is not `true`.
 *
 * @example
 * Only produce a vendor bundle when running in `production`:
 *
 * ```js
 * bud.when(bud.isProduction, () => bud.vendor())
 * ```
 *
 * @example
 * Use `eval` sourcemap in development mode and `hidden-source-map` in production:
 *
 * ```js
 * bud.when(
 *   bud.isDevelopment,
 *   () => bud.devtool('eval'),
 *   () => bud.devtool('hidden-source-map'),
 * )
 * ```
 *
 * @public
 */
export function when(
  test: ((app: Bud) => boolean) | boolean,
  trueCase: (app: Bud) => any,
  falseCase?: (app: Bud) => any,
): Bud {
  const ctx = this as Bud

  const result = ctx.maybeCall(test)

  if (!isBoolean(result)) {
    ctx.error('[when] test must be a boolean or a function')
    throw new Error(result)
  }

  this.maybeCall(test)
    ? trueCase && isFunction(trueCase) && trueCase(this)
    : falseCase && isFunction(falseCase) && falseCase(this)

  return this
}
