import {Api} from '@roots/bud-types'

const babel: Api.Babel = function (options) {
  this.features.enable('babel')

  this.loaders.merge(
    'babel.options',
    this.hooks.filter('api.babel', options),
  )

  return this
}

export {babel}
