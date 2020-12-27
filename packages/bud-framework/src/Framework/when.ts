import {isFunction, isEqual} from '@roots/bud-support'
import {Framework} from '@roots/bud-typings'

export const when: Framework.When = function (
  test,
  isTrue,
  isFalse,
) {
  isEqual(test, true)
    ? isFunction(isTrue) && isTrue(this)
    : isFunction(isFalse) && isFalse(this)

  return this
}
