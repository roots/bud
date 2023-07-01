import isArray from '@roots/bud-support/lodash/isArray'
import isString from '@roots/bud-support/lodash/isString'

import type {Value} from './types.js'

export const isValue = (value: unknown): value is Value => {
  if (value === false) return true
  if (isString(value)) return true
  if (isArray(value)) return true

  return false
}
