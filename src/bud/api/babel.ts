import {Bud, Babel, BabelProperties} from './types'

const babel: Babel = function (
  this: Bud,
  options: BabelProperties,
): Bud {
  this.state.features.babel = true
  this.state.options.babel = {
    ...this.state.options.babel,
    ...options,
  }

  return this
}

export {babel}
