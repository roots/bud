import isArray from '@roots/bud-support/lodash/isArray'
import isFunction from '@roots/bud-support/lodash/isFunction'

import type {Bud} from '../index.js'

/**
 * @public
 */
export interface when {
  (
    test:
      | ((app: Bud) => boolean)
      | boolean
      | Array<((app: Bud) => boolean) | boolean>,
    trueCase: ((app: Bud) => any) | Array<(app: Bud) => any>,
    falseCase?: ((app: Bud) => any) | Array<(app: Bud) => any>,
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
  test:
    | ((app: Bud) => boolean)
    | boolean
    | Array<((app: Bud) => boolean) | boolean>,
  trueCase: ((app: Bud) => any) | Array<(app: Bud) => any>,
  falseCase?: ((app: Bud) => any) | Array<(app: Bud) => any>,
): Bud {
  const ctx = this as Bud

  const callTestCase = value => {
    const unwrapped = ctx.maybeCall(value)
    const iterableValue = isArray(unwrapped) ? unwrapped : [unwrapped]
    return iterableValue.every(
      v => (isFunction(v) ? ctx.maybeCall(v) : v) === true,
    )
  }

  const callMatchedCase = (
    value: ((app: Bud) => any) | Array<(app: Bud) => any>,
  ) =>
    (isArray(value) ? value : [value])
      .filter(v => isFunction(v))
      .map(value => ctx.tap(value))

  callMatchedCase(callTestCase(test) ? trueCase : falseCase)

  return this
}
