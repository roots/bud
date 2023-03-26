import {InputError} from '@roots/bud-support/errors'
import isArray from '@roots/bud-support/lodash/isArray'
import isFunction from '@roots/bud-support/lodash/isFunction'
import noop from '@roots/bud-support/lodash/noop'
import chalk from 'chalk'

import type {Bud} from '../index.js'

export interface when {
  (
    test:
      | ((app: Bud) => boolean)
      | boolean
      | Array<((app: Bud) => boolean) | boolean>,
    trueCase: ((app: Bud) => any) | Array<(app: Bud) => any>,
    falseCase?: ((app: Bud) => any) | Array<(app: Bud) => any>,
    description?: string,
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
 */
export function when(
  test:
    | ((app: Bud) => boolean)
    | boolean
    | Array<((app: Bud) => boolean) | boolean>,
  trueCase: ((app: Bud) => any) | Array<(app: Bud) => any>,
  falseCase?: ((app: Bud) => any) | Array<(app: Bud) => any>,
  description: string = ``,
): Bud {
  const ctx = this as Bud

  const callTestCase = (value: any) => {
    const iterableValue = isArray(value) ? value : [value]
    return iterableValue.every(v => ctx.maybeCall(v) === true)
  }

  const whenTrue = isArray(trueCase) ? trueCase : [trueCase ?? noop]
  const whenFalse = isArray(falseCase) ? falseCase : [falseCase ?? noop]

  /* validate */
  if (![...whenTrue, ...whenFalse].every(isFunction)) {
    throw new InputError(
      `bud.when: all supplied conditionals must be functions`,
      {
        props: {
          details: `\n  This is incorrect: bud.when(() => true, ${chalk.red(
            `bud.vendor()`,
          )}).\n  This is what you wanted: bud.when(() => true, ${chalk.green(
            `() => bud.vendor()`,
          )})`,
          docs: new URL(`https://bud.js.org/docs/bud.when`),
        },
      },
    )
  }

  callTestCase(test) ? whenTrue.map(ctx.tap) : whenFalse.map(ctx.tap)

  return this
}
