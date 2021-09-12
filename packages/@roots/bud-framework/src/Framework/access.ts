import {isFunction} from 'lodash'

import type {Framework} from './'

/**
 * Close interface
 *
 * @param this - {@link @roots/bud-framework#Framework}
 * @param done - Callback function to be called before end of run
 *
 * @public
 */
export interface access<I = any> {
  (this: Framework, value: Framework.Tapable | I): I
}

/**
 * Calls a given value if it is a function. The function will be bound to
 * {@link @roots/bud-framework#Framework} before it is called.
 *
 * If it is not a function, returns the value without doing anything to it.
 *
 * @param this - {@link @roots/bud-framework#Framework}
 * @param done - Callback function to be called before end of run
 * @typeParam I - Type of the value expected to be returned
 *
 * @public
 */
export function access<I = any>(
  this: Framework,
  value: Framework.Tapable | I,
) {
  return isFunction(value) ? value.bind(this)(this) : value
}
