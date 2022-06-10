import {Bud} from '../bud.js'

/**
 * Pipe callback
 *
 * @remarks
 * The output of this function becomes the input to the next
 *
 * @public
 */
interface Callback<T = Bud> {
  (input: T): T
}

/**
 * @public
 */
export interface pipe {
  <T = Bud>(fns: Callback<T>[], value?: T): T
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
export function pipe<T = Bud>(fns: Callback<T>[], value?: T): T {
  const app = this as Bud

  const pipeReducer = (val: T, fn: Callback<T>) => {
    return fn.call(val, val)
  }

  return value
    ? fns.reduce(pipeReducer, value)
    : fns.reduce(pipeReducer, app)
}
