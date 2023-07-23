import type {Bud} from '@roots/bud-framework'

import {BudError} from '@roots/bud-support/errors'
import isFunction from '@roots/bud-support/lodash/isFunction'
import logger from '@roots/bud-support/logger'

export interface bindFacade {
  (
    this: Bud,
    key: `${keyof Bud & string}`,
    fn: CallableFunction,
    binding?: unknown,
  ): Bud
}

/**
 * Bind a synchronous facade
 */
export const bindFacade: bindFacade = function (key, fn, binding?) {
  if (!isFunction(fn))
    throw new BudError(`bud.bindFacade error: ${key} is not a function.`)

  if (`bind` in fn) fn = fn.bind(binding ?? this)

  this.set(key, (...args: Array<any>) => {
    this.promised
      .then(async () => await fn(...args))
      .catch(this.catch)
      .finally(() => {
        logger.success(`finished promised call:`, `bud.${key}`)
      })
    return this
  })

  return this
}
