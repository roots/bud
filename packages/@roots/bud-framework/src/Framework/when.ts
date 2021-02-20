import {isFunction, isEqual} from '@roots/bud-support'

export function when<T>(
  this: T,
  test: boolean,
  isTrue: (bud: T) => unknown,
  isFalse?: (bud: T) => unknown,
): T {
  isEqual(test, true)
    ? isFunction(isTrue) && isTrue(this)
    : isFunction(isFalse) && isFalse(this)

  return this
}
