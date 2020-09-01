import {Api} from '@roots/bud-typings'

const devtool: Api.Devtool = function (devtool) {
  this.options.set('webpack.devtool', devtool)

  return this
}

export {devtool}
