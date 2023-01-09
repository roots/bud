import type {Bud} from '../bud.js'

export interface bindMethod {
  (key: string, value: (...args: any[]) => Bud | Promise<Bud>): Bud
}

/**
 * Bind a callable function to {@link Bud}
 *
 * @remarks
 * You should also override the {@link Bud} module declaration to ensure
 * that your typings are applied.
 *
 * @example
 * Bind a function named `fooFn` to `app.foo`
 *
 * ```js
 * app.service.bindClass({foo: fooFn})
 * ```
 *
 * @example
 * Extend bud typings:
 *
 * ```ts
 * declare module '@roots/bud-framework' {
 *  interface Bud {
 *   foo: typeof fooFn
 *  }
 * }
 * ```
 */
export function bindMethod(
  key: string,
  value: (...args: any[]) => Bud | Promise<Bud>,
): Bud {
  const app = this as Bud

  app[key] = value.bind(app)

  return app
}
