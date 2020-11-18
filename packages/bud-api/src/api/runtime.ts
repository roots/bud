import {Bud} from '@roots/bud-typings'

export const runtime = function(): Bud.Contract {
  this.features.set('runtimeChunk', true)

  return this
}

export type Runtime<T = Bud.Contract> = (this: T) => T
