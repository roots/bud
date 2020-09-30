import Bud from '@roots/bud-types'

export const terser: Bud.Config.Terser = function (options) {
  if (options) {
    this.store['plugins'].set('terser', {
      ...this.store['plugins'].get('terser'),
      ...options,
    })
  }

  return this
}
