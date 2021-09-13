import {Framework, Tapable} from '..'

export interface tap<T = Framework> {
  (fn: Tapable<[T]>, bound?: boolean): T
}

/**
 * Execute a callback
 *
 * @remarks
 * Callback is provided {@link Framework | the Framework instance} as a parameter.
 *
 * @example
 * ```js
 * bud.tap(bud => {
 *   // do something with bud
 * })
 * ```
 *
 * @example
 * Lexical scope is bound to Framework where applicable, so it
 * is possible to reference the Framework using `this`.
 *
 * ```js
 * bud.tap(function () {
 *  // do something with this
 * })
 * ```
 *
 * @public
 */
export const tap: tap<Framework> = function (
  fn: Tapable<[Framework]>,
  bound: boolean = true,
): Framework {
  fn.call(bound ? this : null, this)

  return this
}
