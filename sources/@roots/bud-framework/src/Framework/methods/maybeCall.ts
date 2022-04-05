import {lodash} from '@roots/bud-support'

import {Framework} from '..'

const {isFunction} = lodash

/**
 * @internal
 */
export interface maybeCall {
  <I = Framework>(maybeCallable: maybeCallable<I>, value?: I): I
}

export type maybeCallable<I = unknown> = ((param: Framework) => I) | I

/**
 * Calls a given value if it is a function. The function will be bound to
 * Budbefore it is called.
 *
 * If it is not a function, returns the value without doing anything to it.
 *
 * @typeParam I - Type of the value expected to be returned
 * @public
 */
export function maybeCall<I = Framework>(maybeCallable: maybeCallable): I {
  const app = this as Framework

  return isFunction(maybeCallable)
    ? maybeCallable.call(app, app)
    : maybeCallable
}
