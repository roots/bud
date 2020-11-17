import {isFunction} from 'lodash'
import type {MaybeCallable} from '@roots/bud-typings'

export const callMeMaybe = function <I = unknown>(
  value: MaybeCallable<I>,
  ...args: unknown[]
): I {
  return isFunction(value) ? value(args) : value
}
