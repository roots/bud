import {Config} from '..'

export const gzip: Config.Gzip = function (options?) {
  this.store['features'].set('gzip', true)

  options &&
    this.store['plugins'].merge('compression.gzip', options)

  return this
}
