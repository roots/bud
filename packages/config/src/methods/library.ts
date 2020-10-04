import {Config} from '..'

export const library: Config.Library = function () {
  this.store['features'].enable('library')

  return this
}
