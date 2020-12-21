import {Framework} from '@roots/bud-typings'

export const externals: Externals = function (externals) {
  this.config.merge('externals', externals)
  return this
}

export type Externals = (
  this: Framework,
  externals: {
    [key: string]: any
  },
) => Framework
