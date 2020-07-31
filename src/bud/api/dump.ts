import type {Bud, Dump} from './types'

const dump: Dump = function (enabled: boolean = true): Bud {
  this.features.set('dump', enabled)

  return this
}

export {dump}
