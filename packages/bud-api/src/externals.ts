import {Api} from '@roots/bud-typings'

export const externals: Api.Externals = function (externals) {
  this.hooks.on('webpack.externals', value => ({
    ...value,
    ...externals,
  }))

  return this
}
