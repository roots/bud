import {Bud} from '@roots/bud-typings'

export const externals: Externals = function (externals) {
  this.config.merge('externals', externals)
  return this
}

/**
 * Redefine the module resolution strategy for particular modules.
 */
export type Externals = (
  this: Bud,
  externals: {
    [key: string]: any
  },
) => Bud
