import {isFunction, isEqual} from '@roots/bud-support'
import {Framework} from '../'

export const when: Framework['when'] = function (
  test,
  isTrue,
  isFalse?,
) {
  isEqual(this.access(test), true)
    ? isFunction(isTrue) && isTrue.bind(this)(this)
    : isFunction(isFalse) && isFalse.bind(this)(this)

  return this
}
