import {Api} from '@roots/bud-typings'

export const devtool: Api.Devtool = function (devtool?) {
  this.features.set('devtool', true)
  devtool && this.config.set('devtool', devtool)

  return this
}
