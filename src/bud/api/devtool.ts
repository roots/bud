import type {Bud, Devtool, WebpackOptions} from './types'

const devtool: Devtool = function (devtool: WebpackOptions.Devtool): Bud {
  this.state.options.devtool = devtool

  return this
}

export {devtool}
