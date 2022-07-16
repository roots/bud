import type {Bud} from '../bud.js'

export interface get {
  (name: string): Promise<Bud>
}

/**
 * Returns {@link Bud} instance from the {@link Bud.children} {@link Container}
 *
 * @remarks
 * An optional {@link tap} function can be provided to configure the {@link Bud} instance.
 *
 * @example
 * ```js
 * const name = 'plugin'
 * const tapFn = plugin => plugin.entry('main', 'main.js')
 *
 * bud.get(name, tapFn)
 * ```
 *
 * @public
 */
export const get: get = async function (name: string): Promise<Bud> {
  const ctx = this as Bud

  ctx.log(`get child instance:`, name)

  return ctx.children[name]
}
