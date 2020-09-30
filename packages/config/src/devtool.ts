import Bud from '@roots/bud-types'

export const devtool: Bud.Config.Devtool = function (devtool?) {
  this.features.enable('devtool')

  devtool && this.options.set('webpack.devtool', devtool)

  return this
}
