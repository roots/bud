import {Api} from '@roots/bud-typings'

export const externals: Api.Externals = function (externals) {
  this.store.merge('webpack.externals', externals)
  return this
}
