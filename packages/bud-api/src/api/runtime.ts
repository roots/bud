import {Bud} from '@roots/bud-typings'

export const runtime = function (
  this: Bud.Contract,
): Bud.Contract {
  this.features.set('runtimeChunk', true)

  return this
}
