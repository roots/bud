import type {Bud, Webpack} from '@roots/bud-typings'

export const devtool: Devtool = function (devtool?) {
  this.features.set('devtool', true)
  devtool && this.config.set('devtool', devtool)

  return this
}

export type Devtool = (
  this: Bud.Contract,
  devtool?: Webpack.Configuration['devtool'],
) => Bud.Contract
