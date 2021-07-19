import {isFunction} from 'lodash'

import type {Framework} from './'

/**
 * If a value is a function **access** will call that
 * function and return the result.
 *
 * If the value is not a function **access** will return its value.
 *
 * ```js
 * const isAFunction = (option) => `option value: ${option}`
 * const isAValue = 'option value: true'
 *
 * access(isAFunction, true) // => `option value: true`
 *
 * access(isAValue) // => `option value: true`
 * ```
 */
type Access<I = any> = (
  this: Framework,
  value: Framework.Tapable<I> | I,
) => I

const access: Access = function (value) {
  return isFunction(value) ? value(this) : value
}

export {access, Access}
