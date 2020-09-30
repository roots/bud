import Bud from '@roots/bud-types'

export const publicPath: Bud.Config.PublicPath = function (dir) {
  this.paths.set('public', dir)
  this.options.set('webpack.publicPath', dir)

  return this
}
