import {Api} from '@roots/bud-typings'

export const devtool: Api.Devtool = function (devtool?) {
  this.store.set('features.devtool', true)
  devtool && this.store.set('webpack.devtool', devtool)

  return this
}
