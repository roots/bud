import {Framework} from '..'

export interface tap<T = Framework> {
  (fn: (app: Framework) => unknown, bound?: boolean): Framework
}

/**
 * Execute a callback function to contain code execution
 * side effects
 *
 * @remarks
 * Callback is provided {@link Framework} as a parameter.
 *
 * @example
 * ```ts
 * bud.tap(bud => {
 *   // do something with bud
 * })
 * ```
 *
 * @example
 * Lexical scope is bound to Framework where applicable, so it
 * is possible to reference the Framework using `this`.
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
  fn: (app: Framework) => unknown,
  bound: boolean = true,
): Framework {
  const app = this

  fn.call(bound ? app : null, app)

  return app
}

export interface tapAsync<T = Framework> {
  (
    fn: (app: Framework) => Promise<unknown>,
    bound?: boolean,
  ): Promise<Framework>
}

/**
 * Execute an async callback
 *
 * @remarks
 * Callback is provided {@link Framework | the Framework instance} as a parameter.
 *
 * @example
 * ```js
 * bud.tapAsync(async bud => {
 *   // do something with bud
 * })
 * ```
 *
 * @example
 * Lexical scope is bound to Framework where applicable, so it
 * is possible to reference the Framework using `this`.
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
  fn: (app: Framework) => Promise<unknown>,
  bound: boolean = true,
): Promise<Framework> {
  await fn.call(bound ? this : null, this)

  return this
}
