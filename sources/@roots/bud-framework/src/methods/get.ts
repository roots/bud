import type {Bud} from '../bud.js'

export interface get {
  (label: string): Bud
}

/**
 * Returns {@link Bud} instance from the {@link Bud.children} {@link Container}
 *
 * @remarks
 * An optional {@link tap} function can be provided to configure the {@link Bud} instance.
 *
 * @example
 * ```js
 * bud.get(label)
 * ```
 *
 * @public
 */
export const get: get = function (label: string): Bud {
  const ctx = this as Bud

  ctx.log('get child instance:', label)

  return ctx.children[label]
}
