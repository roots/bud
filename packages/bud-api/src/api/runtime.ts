import {Bud} from '@roots/bud-typings'

export const runtime = function (): Bud {
  this.features.set('runtimeChunk', true)

  return this
}

export type Runtime<T = Bud> = (this: T) => T
