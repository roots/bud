import {Bud} from './types'
import {BabelTransformOptions} from '@roots/bud-typings'

type Babel = (this: Bud, options: BabelTransformOptions) => Bud

const babel: Babel = function (options) {
  this.features.enable('babel')
  this.options.set('babel', {
    ...this.options.get('babel'),
    ...this.hooks.filter('bud.api.babel', options),
  })

  return this
}

export {babel}
export type {Babel}
