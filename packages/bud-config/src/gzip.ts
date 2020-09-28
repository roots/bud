import Bud from '@roots/bud-types'

export const gzip: Bud.Config.Gzip = function (options?) {
  this.features.set('gzip', true)

  options &&
    this.options.merge('plugins.compression.gzip', options)

  return this
}
