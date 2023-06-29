import isFunction from '@roots/bud-support/lodash/isFunction'

import type {Callback} from './types.js'

export const isCallback = (value: unknown): value is Callback => {
  return isFunction(value)
}
