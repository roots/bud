import {lodash} from '@roots/bud-support'

import {Bud} from '..'

const {isFunction} = lodash

export interface get {
  (this: Bud, name: string, tap?: (app: Bud) => Promise<Bud>): Promise<Bud>
}

export interface get {
  (name: string, tap?: (app: Bud) => Promise<Bud>): Promise<Bud>
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
export const get: get = async function (
  name: string,
  tap?: (app: Bud) => Promise<Bud>,
): Promise<Bud> {
  const ctx = this.root as Bud

  ctx.log('get request', name)

  const instance = ctx.children?.get(name)

  if (tap && isFunction(tap)) {
    await tap(instance)
  }

  return instance
}
