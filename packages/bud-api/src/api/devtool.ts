import type {Bud, Webpack} from '@roots/bud-typings'

export const devtool: Devtool = function (devtool?) {
  this.features.set('devtool', true)
  devtool && this.config.set('devtool', devtool)

  return this
}

export type Devtool<T = Bud.Contract> = (
  this: T,
  devtool?: Webpack.Configuration['devtool'],
) => T
