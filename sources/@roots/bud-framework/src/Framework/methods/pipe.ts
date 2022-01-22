import {Framework} from '..'

/**
 * Pipe callback
 *
 * @remarks
 * The output of this function becomes the input to the next
 *
 * @public
 */
interface Callback<T = Framework> {
  (input: T): T
}

/**
 * @public
 */
export interface pipe {
  <T = Framework>(fns: Callback<T>[], value?: T): T
}

/**
 * Pipe a value through an array of functions
 *
 * @remarks
 * - The return value of each callback is used as input for the next.
 *
 * - If no value is provided the value is assumed to be the Framework itself
 *
 * - `bud.sequence` is a non-mutational version of this method.
 *
 * @public
 */
export function pipe<T = Framework>(fns: Callback<T>[], value?: T): T {
  const pipeReducer = (val: T, fn: Callback<T>) => {
    return fn(val)
  }

  return value
    ? fns.reduce(pipeReducer, value)
    : fns.reduce(pipeReducer, this)
}
