import type {Bud} from '../bud.js'

export interface tap<T = Bud> {
  (fn: (app: Bud) => unknown): Bud
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
 */
export const tap: tap = function (
  this: Bud,
  fn: (app: Bud) => unknown,
): Bud {
  fn.call(this, this)
  return this
}

export interface tapAsync<T = Bud> {
  (fn: (app: Bud) => Promise<unknown>): Promise<Bud>
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
 */
export const tapAsync: tapAsync = async function (
  this: Bud,
  fn: (app: Bud) => Promise<unknown>,
): Promise<Bud> {
  await fn.call(this, this)

  return this
}
