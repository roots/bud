import {Framework} from '..'
import {isFunction} from '../framework.dependencies'

/**
 * @internal
 */
export interface maybeCall<I = any> {
  (value: ((app: Framework) => I) | I): I
}

/**
 * Calls a given value if it is a function. The function will be bound to
 * Budbefore it is called.
 *
 * If it is not a function, returns the value without doing anything to it.
 *
 * @param this - Bud
 * @typeParam I - Type of the value expected to be returned
 *
 * @public
 */
export function maybeCall<I = any>(value: (app: Framework) => I | I) {
  this as Framework
  return isFunction(value) ? value.bind(this)(this) : value
}
