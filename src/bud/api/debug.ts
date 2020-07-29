import type {Bud, Debug} from './types'

const debug: Debug = function (this: Bud, enabled: boolean): Bud {
  this.features.enable('debug')

  return this
}

export {debug}
