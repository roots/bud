import {Bud} from '..'

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
 * @example
 * Lexical scope is bound to Bud where applicable, so it
 * is possible to reference the Bud using `this`.
 *
 * ```ts
 * bud.tap(function () {
 *  this.log('this references bud from the outer scope')
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

  fn.call(bound ? app : null, app)

  return app
}

export interface tapAsync<T = Bud> {
  (
    fn: (app: Bud) => Promise<unknown>,
    bound?: boolean,
  ): Promise<Bud>
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
 * @example
 * Lexical scope is bound to Bud where applicable, so it
 * is possible to reference the Bud using `this`.
 *
 * ```js
 * bud.tapAsync(async function () {
 *  // do something with this
 * })
 * ```
 *
 * @public
 */
export const tapAsync: tapAsync = async function (
  fn: (app: Bud) => Promise<unknown>,
  bound: boolean = true,
): Promise<Bud> {
  await fn.call(bound ? this : null, this)

  return this
}
