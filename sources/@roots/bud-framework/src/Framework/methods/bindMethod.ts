import {Framework} from '../'

export interface GenericFunctionMap {
  [key: string]: CallableFunction
}

export interface bindMethod {
  <FunctionMap = GenericFunctionMap>(properties: FunctionMap): Framework
}

/**
 * Bind a {@link CallableFunction} to the {@link Framework}
 *
 * @example
 * Bind a function named `fooFn` to `app.foo`
 *
 * ```js
 * app.service.bindClass({foo: fooFn})
 * ```
 *
 * @remarks
 * You should also override the {@link @roots/bud-framework# | '@roots/bud-framework' module} to ensure
 * that your function typings are correctly implemented and exported.
 *
 * @typeParam FunctionMap - Map of {@link Framework} keys to {@link CallableFunction} types
 *
 * @public
 */
export function bindMethod<FunctionMap = GenericFunctionMap>(
  properties: FunctionMap,
): Framework {
  const app = this as Framework

  Object.entries(properties).forEach(([key, value]) => {
    app[key] = value.bind(app)
  })

  return app
}
