import Bud from '@roots/bud-types'

export const terser: Bud.Config.Terser = function (options) {
  if (options) {
    this.options.set('plugins.terser', {
      ...this.options.get('plugins.terser'),
      ...options,
    })
  }

  return this
}
