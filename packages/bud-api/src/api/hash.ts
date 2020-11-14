import {Bud} from '@roots/bud-typings'

export const hash: Hash = function (enabled?) {
  this.features.set('hash', enabled)

  return this
}

export type Hash = (
  this: Bud.Contract,
  enabled?: boolean,
) => Bud.Contract
