import type {Bud, Dump} from './types'

const dump: Dump = function (enabled: boolean = true): Bud {
  this.state.features.dump = enabled

  return this
}

export {dump}
