import {Framework} from '..'
import {isFunction} from '../framework.dependencies'

export interface get {
  (
    this: Framework,
    name: string,
    tap?: (app: Framework) => Framework,
  ): Framework
}

export interface get {
  (name: string, tap?: (app: Framework) => Framework): Framework
}

/**
 * Retrieves a specific {@link Framework | Framework instance} by name.
 *
 * @public
 */
export const get: get = function (
  name: string,
  tap?: (app: Framework) => Framework,
): Framework {
  const ctx = this.root as Framework

  ctx.log('get request', name)

  const instance = ctx.children?.get(name)

  if (tap && isFunction(tap)) {
    tap(instance)
  }

  return instance
}
