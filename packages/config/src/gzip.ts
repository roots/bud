import Bud from '@roots/bud-types'

export const gzip: Bud.Config.Gzip = function (options?) {
  this.store['features'].set('gzip', true)

  options &&
    this.store['plugins'].merge('compression.gzip', options)

  return this
}
