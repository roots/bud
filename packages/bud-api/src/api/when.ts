import type {Bud} from '@roots/bud-typings'
import {lodash as _} from '@roots/bud-support'

export function when(
  this: Bud.Contract,
  test: boolean,
  isTrue: (bud: Bud.Contract) => unknown,
  isFalse?: (bud: Bud.Contract) => unknown,
): Bud.Contract {
  _.isEqual(test, true)
    ? _.isFunction(isTrue) && isTrue(this)
    : _.isFunction(isFalse) && isFalse(this)

  return this
}
