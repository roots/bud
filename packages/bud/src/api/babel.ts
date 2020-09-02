import {Api} from '@roots/bud-typings'

const babel: Api.Babel = function (options) {
  this.features.enable('babel')
  this.options.merge('babel', this.hooks.filter('api.babel', options))

  return this
}

export {babel}
