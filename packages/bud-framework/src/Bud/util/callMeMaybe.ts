import {isFunction} from 'lodash'
import type {MaybeCallable} from '@roots/bud-typings'

export const callMeMaybe = function <I = unknown>(
  value: MaybeCallable<I>,
): I {
  return isFunction(value) ? value(this) : value
}
