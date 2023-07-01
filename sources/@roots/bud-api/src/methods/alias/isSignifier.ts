import isString from '@roots/bud-support/lodash/isString'

import type {Callback, Records, Signifier} from './types.js'

export const isSignifier = (
  value: Callback | Records | Signifier,
): value is Signifier => {
  return isString(value)
}
