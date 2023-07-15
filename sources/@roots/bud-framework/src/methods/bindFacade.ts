import {BudError} from '@roots/bud-support/errors'
import isFunction from '@roots/bud-support/lodash/isFunction'

import type {Bud} from '../bud.js'

/**
 * Bind a synchronous facade
 */
export function bindFacade(
  this: Bud,
  key: `${keyof Bud & string}`,
  fn: CallableFunction,
  binding?: unknown,
) {
  if (!isFunction(fn)) {
    throw new BudError(`bud.bindFacade error: ${key} is not a function.`)
  }
  if (`bind` in fn) fn = fn.bind(binding ?? this)

  this.set(key, (...args: Array<any>) => {
    this.promised.push(fn(...args))
    return this
  })
}
