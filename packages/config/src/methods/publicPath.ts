import {Config} from '..'

export const publicPath: Config.PublicPath = function (dir) {
  this.store['paths'].set('public', dir)
  this.store['webpack'].set('publicPath', dir)

  return this
}
