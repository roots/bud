import {Config} from '..'

export const brotli: Config.Brotli = function (options) {
  this.store['features'].set('brotli', true)

  if (options) {
    this.store['components'].plugins.compression.brotli = options
  }

  return this
}
