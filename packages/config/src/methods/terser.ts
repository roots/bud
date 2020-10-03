import {Config} from '..'

export const terser: Config.Terser = function (options) {
  if (options) {
    this.store['plugins'].set('terser', {
      ...this.store['plugins'].get('terser'),
      ...options,
    })
  }

  return this
}
