import type {Bud} from '@roots/bud-framework'

import isUndefined from '@roots/bud-support/lodash/isUndefined'

/**
 * Pipe callback
 *
 * @remarks
 * The output of this function becomes the input to the next
 */
interface Callback<T = any> {
  (input: T): Promise<T>
}

export interface pipe {
  <T = Bud>(fns: Array<Callback<T>>, value?: T): Promise<T>
}

/**
 * Pipe a value through an array of functions. The return value of each callback is used as input for the next.
 *
 * @remarks
 * If no value is provided the value is assumed to be the {@link Bud} itself
 *
 * {@link sequence} is a non-mutational version of this method.
 *
 * @example
 * ```js
 * app.pipe(
 *   [
 *     value => value + 1,
 *     value => value + 1,
 *   ],
 *   1, // initial value
 * ) // resulting value is 3
 * ```
 */
export const pipe: pipe = async function (functions, maybeInitialValue) {
  return await functions.reduce(
    async (value, fn) => {
      const nextValue = await value
      return await fn(nextValue)
    },
    Promise.resolve(
      !isUndefined(maybeInitialValue) ? maybeInitialValue : this,
    ),
  )
}
