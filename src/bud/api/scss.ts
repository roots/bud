import type {Bud} from './types'

/**
 * ## bud.scss
 */
const scss = function (enabled: boolean): Bud {
  this.state.features.scss = enabled ?? true

  return this
}

export {scss}
