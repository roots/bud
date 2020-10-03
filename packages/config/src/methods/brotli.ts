import {Config} from '..'

export const brotli: Config.Brotli = function (options) {
  this.store['plugins'].set('brotli', true)

  options &&
    this.store['plugins'].set('compression.brotli', options)

  return this
}
