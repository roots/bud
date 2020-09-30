import Bud from '@roots/bud-types'

export const publicPath: Bud.Config.PublicPath = function (dir) {
  this.store['paths'].set('public', dir)
  this.store['webpack'].set('publicPath', dir)

  return this
}
