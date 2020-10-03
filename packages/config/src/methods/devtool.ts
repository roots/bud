import {Config} from '..'

export const devtool: Config.Devtool = function (devtool?) {
  this.store['features'].enable('devtool')

  devtool && this.store['webpack'].set('devtool', devtool)

  return this
}
