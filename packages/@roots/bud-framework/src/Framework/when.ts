import {isFunction, isEqual} from '@roots/bud-support'

export function when(test, isTrue, isFalse?) {
  isEqual(this.access(test), true)
    ? isFunction(isTrue) && isTrue.bind(this)(this)
    : isFunction(isFalse) && isFalse.bind(this)(this)

  return this
}
