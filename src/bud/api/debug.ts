import type {Bud, Debug} from './types'

/**
 * @deprecated
 */
const debug: Debug = function (this: Bud, enabled: boolean): Bud {
  this.state.features.debug = enabled

  return this
}

export {debug}
