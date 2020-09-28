import Bud from '@roots/bud-types'

export const brotli: Bud.Config.Brotli = function (options?) {
  this.features.set('brotli', true)

  options &&
    this.options.merge('plugins.compression.brotli', options)

  return this
}
