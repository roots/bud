import {Framework} from '..'

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
 * Pipe a value through an array of functions. The return value of each callback is used as input for the next.
 *
 * @remarks
 * If no value is provided the value is assumed to be the {@link (Framework:class)} itself
 *
 * {@link (sequence:function)} is a non-mutational version of this method.
 *
 * @public
 */
export function pipe<T = Framework>(
  fns: Callback<T>[],
  value?: T,
): T {
  const pipeReducer = (val: T, fn: Callback<T>) => {
    return fn(val)
  }

  return value
    ? fns.reduce(pipeReducer, value)
    : fns.reduce(pipeReducer, this)
}
