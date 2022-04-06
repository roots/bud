import {lodash} from '@roots/bud-support'

import {Bud} from '..'

const {isFunction} = lodash

export interface get {
  (
    this: Bud,
    name: string,
    tap?: (app: Bud) => Bud,
  ): Bud
}

export interface get {
  (name: string, tap?: (app: Bud) => Bud): Bud
}

/**
 * Retrieves a specific {@link Bud | Bud instance} by name.
 *
 * @public
 */
export const get: get = function (
  name: string,
  tap?: (app: Bud) => Bud,
): Bud {
  const ctx = this.root as Bud

  ctx.log('get request', name)

  const instance = ctx.children?.get(name)

  if (tap && isFunction(tap)) {
    tap(instance)
  }

  return instance
}
