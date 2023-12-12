import isArray from '@roots/bud-support/isArray'
import isFunction from '@roots/bud-support/isFunction'
import isObject from '@roots/bud-support/isObject'

import type {Callback, Records, Signifier} from './types.js'

export const isRecords = (
  value: Callback | Records | Signifier,
): value is Records => {
  return isObject(value) && !isFunction(value) && !isArray(value)
}
