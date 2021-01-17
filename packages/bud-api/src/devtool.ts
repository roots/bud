import {Api} from '@roots/bud-typings'

export const devtool: Api.Devtool = function (devtool?) {
  this.hooks.on('webpack.devtool', () => devtool ?? true)
  return this
}
