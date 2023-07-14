import {BudError} from '@roots/bud-support/errors'
import isFunction from '@roots/bud-support/lodash/isFunction'

import type {Bud} from '../bud.js'

/**
 * Bind a synchronous facade
 */
export function bindFacade(
  this: Bud,
  name: `${keyof Bud & string}`,
  fn: CallableFunction,
  bind = true,
) {
  if (!isFunction(fn)) {
    throw new BudError(`bud.bindFacade error: ${name} is not a function`)
  }

  if (bind && `bind` in fn) fn = fn.bind(this)

  this.set(name, (...args: Array<any>) => {
    Promise.all(this.promised).then(
      async () => await Promise.resolve(fn.bind(this)(...args)),
    )

    return this
  })
}
