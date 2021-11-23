import {Framework} from '..'

export interface tap<T = Framework> {
  (fn: (app: Framework) => any, bound?: boolean): T
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
  fn: (app: Framework) => any,
  bound: boolean = true,
): Framework {
  fn.call(bound ? this : null, this)

  return this
}
