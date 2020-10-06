import {Config} from '..'

export const terser: Config.Terser = function (options) {
  if (options) {
    this.store['plugins'].merge('terser', options)
  }

  return this
}
