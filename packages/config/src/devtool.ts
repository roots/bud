import Bud from '@roots/bud-types'

export const devtool: Bud.Config.Devtool = function (devtool?) {
  this.store['features'].enable('devtool')

  devtool && this.store['webpack'].set('devtool', devtool)

  return this
}
