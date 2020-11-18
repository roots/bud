import {Bud} from '@roots/bud-typings'

export const publicPath: PublicPath = function(path) {
  this.config.set('output.publicPath', path)

  return this
}

export type PublicPath<T = Bud.Contract> = (
  this: T,
  path: string,
) => T
