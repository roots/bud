import isArray from '@roots/bud-support/lodash/isArray'
import isFunction from '@roots/bud-support/lodash/isFunction'
import isObject from '@roots/bud-support/lodash/isObject'

import type {Callback, Records, Signifier} from './types.js'

export const isRecords = (
  value: Callback | Records | Signifier,
): value is Records => {
  return isObject(value) && !isFunction(value) && !isArray(value)
}
