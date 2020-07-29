import {Bud, Babel, BabelProperties} from './types'

const babel: Babel = function (
  this: Bud,
  options: BabelProperties,
): Bud {
  this.features.enable('babel')
  this.options.merge('babel', options)

  return this
}

export {babel}
