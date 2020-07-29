import {Bud, Babel, BabelProperties} from './types'

const babel: Babel = function (
  this: Bud,
  options: BabelProperties,
): Bud {
  this.features.enable('babel')

  this.state.options.babel = {
    ...this.state.options.babel,
    ...options,
  }

  return this
}

export {babel}
