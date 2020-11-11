import {Bud} from '@roots/bud-typings'

export const hash: Framework.API.Hash = function (
  this: Bud,
  enabled?: boolean,
) {
  this.features.set('hash', enabled)

  return this
}

export type Hash = (this: Bud, enabled?: boolean) => Bud
