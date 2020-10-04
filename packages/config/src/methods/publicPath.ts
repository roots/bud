import {Config} from '..'

export const publicPath: Config.PublicPath = function (path) {
  this.store['build'].output.publicPath = path

  return this
}
