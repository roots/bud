import {Bud, Webpack} from '@roots/bud-typings'

export const devtool = function (
  this: Bud.Contract,
  devtool?: Webpack.Configuration['devtool'],
): Bud.Contract {
  this.features.set('devtool', true)
  devtool && this.config.set('devtool', devtool)

  return this
}
