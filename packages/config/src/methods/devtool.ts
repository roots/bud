import {Config} from '..'

export const devtool: Config.Devtool = function (devtool?) {
  this.store['features'].enable('devtool')

  devtool && this.store['build'].set('devtool', devtool)

  return this
}
