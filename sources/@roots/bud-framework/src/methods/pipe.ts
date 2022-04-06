import {Bud} from '..'

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
 * Pipe a value through an array of functions
 *
 * @remarks
 * - The return value of each callback is used as input for the next.
 *
 * - If no value is provided the value is assumed to be the Bud itself
 *
 * - `bud.sequence` is a non-mutational version of this method.
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
