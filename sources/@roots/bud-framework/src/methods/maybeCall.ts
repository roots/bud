import isFunction from '@roots/bud-support/lodash/isFunction'

import type {Bud} from '../index.js'

export interface maybeCall {
  <I = Bud>(maybeCallable: maybeCallable<I>, value?: I): I
}

export type maybeCallable<I = unknown> = ((param: Bud) => I) | I

/**
 * Calls a given value if it is a function. The function will be bound to
 * Budbefore it is called.
 *
 * If it is not a function, returns the value without doing anything to it.
 *
 * @typeParam I - Type of the value expected to be returned
 */
export function maybeCall<
  I = Bud,
  Args extends Array<undefined | unknown> = [I],
>(this: Bud, value: maybeCallable, ...args: Args): I {
  return isFunction(value)
    ? value.bind
      ? value.bind(this)(...args)
      : value(...args)
    : value
}
