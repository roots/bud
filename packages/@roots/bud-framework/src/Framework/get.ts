import {Framework} from '..'
import {isFunction} from './framework.dependencies'

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
  const ctx = this.root

  ctx.log('get request', name)

  const instance = ctx.children.get(name)

  if (tap && isFunction(tap)) {
    tap(instance)
  }

  return instance
}

export {get}
