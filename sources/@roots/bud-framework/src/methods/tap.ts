import type {Bud} from '../bud.js'

export interface tap<T = Bud> {
  (fn: (app: Bud) => unknown, bound?: boolean): Bud
}

/**
 * Execute a callback function to contain code execution
 * side effects
 *
 * @remarks
 * Callback is provided {@link Bud} as a parameter.
 *
 * @example
 * ```ts
 * bud.tap(bud => {
 *   // do something with bud
 * })
 * ```
 *
 * @public
 */
export const tap: tap = function (
  fn: (app: Bud) => unknown,
  bound: boolean = true,
): Bud {
  const app = this

  fn(app)

  return app
}

export interface tapAsync<T = Bud> {
  (fn: (app: Bud) => Promise<unknown>, bound?: boolean): Promise<Bud>
}

/**
 * Execute an async callback
 *
 * @remarks
 * Callback is provided {@link Bud | the Bud instance} as a parameter.
 *
 * @example
 * ```js
 * bud.tapAsync(async bud => {
 *   // do something with bud
 * })
 * ```
 *
 * @public
 */
export const tapAsync: tapAsync = async function (
  fn: (app: Bud) => Promise<unknown>,
): Promise<Bud> {
  await fn(this)
  return this
}
