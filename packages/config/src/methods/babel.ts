import {Config} from '..'

export const babel: Config.Babel = function (options) {
  this.store['features'].enable('babel')

  this.components['loaders'].merge(
    'babel.options',
    this.hooks.filter('api.babel', options),
  )

  return this
}
