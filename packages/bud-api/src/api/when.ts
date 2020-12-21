import {Framework} from '@roots/bud-typings'
import {isFunction, isEqual} from '@roots/bud-support'

export const when: When = function (test, isTrue, isFalse) {
  isEqual(test, true)
    ? isFunction(isTrue) && isTrue(this)
    : isFunction(isFalse) && isFalse(this)

  return this
}

export type When = (
  test: boolean,
  isTrue: (bud: Framework) => unknown,
  isFalse: (bud: Framework) => unknown,
) => Framework
