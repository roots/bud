import type {Bud, Debug} from './types'

const debug: Debug = function (this: Bud, enabled = true): Bud {
  !enabled ? this.features.disable('debug') : this.features.enable('debug')

  return this
}

export {debug}
