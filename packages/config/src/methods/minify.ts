import {Config} from '..'

export const minify: Config.Minify = function () {
  this.store['features'].enable('minify')

  return this
}
