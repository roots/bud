import {BudError} from '@roots/bud-support/errors'
import isFunction from '@roots/bud-support/lodash/isFunction'

import type {Bud} from '../bud.js'

/**
 * Bind a synchronous facade
 */
export function bindFacade(
  this: Bud,
  name: string,
  fn: CallableFunction,
  binding?: unknown,
) {
  if (!isFunction(fn)) {
    throw new BudError(`bud.bindFacade error: ${name} is not a function`)
  }

  this.set(name as any, (...args: Array<any>) => {
    if (binding !== false && `bind` in fn) fn = fn.bind(binding ?? this)
    this.promised.push(Promise.resolve(fn(...args)))
    return this
  })
}
