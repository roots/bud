import Bud from '@roots/bud-types'

export const babel: Bud.Config.Babel = function (options) {
  this.store['features'].enable('babel')

  this.store['loaders'].merge(
    'babel.options',
    this.hooks.filter('api.babel', options),
  )

  return this
}
