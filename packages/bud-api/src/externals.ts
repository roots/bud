import {Api} from '@roots/bud-typings'

export const externals: Api.Externals = function (externals) {
  this.config.merge('externals', externals)
  return this
}
