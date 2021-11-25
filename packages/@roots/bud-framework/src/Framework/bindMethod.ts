import {lodash} from '@roots/bud-support'

import {Framework} from './'

const {isFunction, isString} = lodash

/**
 * Generic type defining the {@link Service.bindMacro} map of
 * callable function interfaces to {@link Framework} property keys
 */
interface GenericFunctionMap {
  [key: string]: CallableFunction
}

/**
 * Bind a {@link CallableFunction} to the {@link Framework}
 *
 * @example
 * Bind a function named `fooFn` to `app.foo`
 *
 * ```js
 * app.bindMethod({foo: fooFn})
 * ```
 *
 * @typeParam FunctionMap - Map of {@link Framework} keys to {@link CallableFunction} types
 *
 * @public
 * @decorator `@bind`
 */
export function bindMethod<FunctionMap = GenericFunctionMap>(
  methodMap: FunctionMap,
): Framework {
  this as Framework

  const logger = this.logger.instance.scope(
    ...this.logger.context,
    'bindMethod',
  )

  Object.entries(methodMap).forEach(
    ([handle, method]: [string, CallableFunction]) => {
      try {
        if (!isString(handle))
          throw new Error(
            `${handle} must be keyed by its handle (bud.myMethod)`,
          )
        if (!isFunction(method))
          throw new Error(`${handle} is not a function value`)

        this[handle] = method.bind(this)

        if (isFunction(this.handle))
          logger.success({
            message: `registered ${this.name}.${handle}`,
          })
      } catch (error) {
        logger.error(error)
        throw new Error(error)
      }
    },
  )

  return this
}
