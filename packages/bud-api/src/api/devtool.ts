import type {Framework, Webpack} from '@roots/bud-typings'

export const devtool: Devtool = function (devtool?) {
  this.features.set('devtool', true)
  devtool && this.config.set('devtool', devtool)

  return this
}

export type Devtool = (
  this: Framework,
  devtool?: Webpack.Configuration['devtool'],
) => Framework
