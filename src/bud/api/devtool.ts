import type {Bud, Devtool, WebpackOptions} from './types'

const devtool: Devtool = function (devtool: WebpackOptions.Devtool): Bud {
  this.options.set('devtool', devtool)

  return this
}

export {devtool}
