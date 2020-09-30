import Bud from '@roots/bud-types'

export const brotli: Bud.Config.Brotli = function (
  options,
): Bud {
  this.store['plugins'].set('brotli', true)

  options &&
    this.store['plugins'].set('compression.brotli', options)

  return this
}
