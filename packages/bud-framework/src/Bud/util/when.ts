import type {Bud as Application} from '@roots/bud-typings'
import {lodash as _} from '@roots/bud-support'

export const when: Application['when'] = function (
  this: Application,
  test: boolean,
  isTrue: (bud: Application) => unknown,
  isFalse?: (bud: Application) => unknown,
) {
  _.isEqual(test, true)
    ? _.isFunction(isTrue) && isTrue(this)
    : _.isFunction(isFalse) && isFalse(this)

  return this
}
