import isFunction from '@roots/bud-support/lodash/isFunction'

import type {Bud} from '../index.js'

type Parameters = Array<undefined | unknown>

export interface Callable<I = Bud> {
  (...value: Parameters): I
}

export type MaybeCallable<T extends unknown, P extends Parameters> =
  | ((...params: P) => T)
  | Exclude<T, CallableFunction>

interface maybeCall {
  <T extends unknown, P extends never>(
    value: ((bud: T) => T) | Exclude<T, CallableFunction>,
  ): T

  <T extends unknown, P extends Parameters>(
    value: ((...params: P) => T) | Exclude<T, CallableFunction>,
    ...params: P
  ): T
}

/**
 * Calls a given value if it is a function. The function will be bound to
 * Budbefore it is called.
 *
 * If it is not a function, returns the value without doing anything to it.
 *
 * @typeParam I - Type of the value expected to be returned
 */
const maybeCall: maybeCall = function <
  T extends unknown,
  P extends Parameters,
>(value: T, ...params: P) {
  if (!params.length) params.push(this)

  return isFunction(value)
    ? value.bind
      ? value.bind(this)(...params)
      : value(...params)
    : value
}

export {maybeCall}
