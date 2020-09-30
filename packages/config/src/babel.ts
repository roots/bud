import Bud from '@roots/bud-types'

export const babel: Bud.Config.Babel = function (options) {
  this.features.enable('babel')

  console.log(options)
  /** @todo */
  /*
    this.loaders.merge(
      'babel.options',
      this.hooks.filter('api.babel', options),
    )
  */

  return this
}
