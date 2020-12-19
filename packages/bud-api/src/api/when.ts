import {isFunction, isEqual} from '@roots/bud-support'

export const when: When = function (test, isTrue, isFalse) {
  isEqual(test, true)
    ? isFunction(isTrue) && isTrue(this)
    : isFunction(isFalse) && isFalse(this)

  return this
}

export type When<T = Framework.Bud> = (
  test: boolean,
  isTrue: (bud: T) => unknown,
  isFalse: (bud: T) => unknown,
) => T
