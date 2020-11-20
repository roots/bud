import {lodash as _} from '@roots/bud-support'

export const when: When = function (test, isTrue, isFalse) {
  _.isEqual(test, true)
    ? _.isFunction(isTrue) && isTrue(this)
    : _.isFunction(isFalse) && isFalse(this)

  return this
}

export type When<T = Framework.Bud.Contract> = (
  test: boolean,
  isTrue: (bud: T) => unknown,
  isFalse: (bud: T) => unknown,
) => T
