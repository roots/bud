import {Api} from '@roots/bud-types'

const devtool: Api.Devtool = function (devtool?) {
  this.features.enable('devtool')

  devtool && this.options.set('webpack.devtool', devtool)

  return this
}

export {devtool}
