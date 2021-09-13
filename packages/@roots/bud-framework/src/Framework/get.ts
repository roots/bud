import {isFunction} from 'lodash'

import {Framework} from '..'

/**
 * get function interface
 *
 * @internal
 */
interface get {
  (
    this: Framework,
    name: string,
    tap?: (app: Framework) => Framework,
  ): Framework
}

/**
 * get function interface
 *
 * @internal @override
 */
interface get {
  (name: string, tap?: (app: Framework) => Framework): Framework
}

/**
 * Retrieves a specific {@link Framework | Framework instance} by name.
 *
 * @public
 */
const get: get = function (
  name: string,
  tap?: (app: Framework) => Framework,
): Framework {
  this.log('get request', name)

  const instance = this.children.get(name)

  if (tap && isFunction(tap)) {
    tap(instance)
  }

  return instance
}

export {get}
