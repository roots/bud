import type {Bud, Debug} from './types'

const debug: Debug = function (this: Bud, enabled: boolean): Bud {
  this.features.set({debug: enabled ?? true})

  return this
}

export {debug}
