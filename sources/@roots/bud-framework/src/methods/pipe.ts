import {isUndefined} from '@roots/bud-support/lodash-es'

import {Bud} from '../bud.js'

/**
 * Pipe callback
 *
 * @remarks
 * The output of this function becomes the input to the next
 *
 * @public
 */
interface Callback<T> {
  (input: T): T
}

/**
 * @public
 */
export interface pipe {
  <T = unknown>(fns: Array<Callback<T>>, value: T): T
  <T = Bud>(fns: Array<Callback<T>>, value: undefined): T
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
 *
 * @public
 */
export const pipe: pipe = function <T>(
  fns: Array<Callback<T>>,
  value?: T,
) {
  const bud = this as Bud

  if (valueIsBud<T>(value)) {
    return fns.reduce((value, fn) => fn(value), bud as T)
  }

  return fns.reduce(
    (value: T, fn: (value: T) => T) => fn.call(value, value),
    value,
  )
}

const valueIsBud = <T>(value: T): value is Bud & T => {
  return isUndefined(value) || value instanceof Bud
}
