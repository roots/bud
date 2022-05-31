import {Bud} from '../bud.js'

export interface GenericFunctionMap {
  [key: string]: CallableFunction
}

export interface bindMethod {
  <FunctionMap = GenericFunctionMap>(properties: FunctionMap): Bud
}

/**
 * Bind a {@link CallableFunction} to {@link Bud}
 *
 * @example
 * Bind a function named `fooFn` to `app.foo`
 *
 * ```js
 * app.service.bindClass({foo: fooFn})
 * ```
 *
 * @remarks
 * You should also override the {@link Bud} module declaration to ensure
 * that your typings are correctly implemented and exported.
 *
 * @typeParam FunctionMap - Map of {@link Bud} keys to {@link CallableFunction} types
 *
 * @public
 */
export function bindMethod<FunctionMap = GenericFunctionMap>(
  properties: FunctionMap,
): Bud {
  const app = this as Bud

  Object.entries(properties).forEach(([key, value]) => {
    app[key] = value.bind(app)
  })

  return app
}
