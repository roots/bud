import {Bud} from '@roots/bud-typings'

export const externals: Externals = function (externals) {
  this.config.merge('externals', externals)
  return this
}

export type Externals<T = Bud.Contract> = (
  this: T,
  externals: {
    [key: string]: any
  },
) => T
