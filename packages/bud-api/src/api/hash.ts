import {Bud} from '@roots/bud-typings'

export const hash: Hash = function (enabled?) {
  this.features.set('hash', enabled ?? true)

  return this
}

export type Hash<T = Bud> = (this: T, enabled?: boolean) => T
