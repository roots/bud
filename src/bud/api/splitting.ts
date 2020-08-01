import type {Bud, Splitting} from './types'

const splitting: Splitting = function (this: Bud, enabled: boolean): Bud {
  this.features.set('splitting', enabled ?? true)

  return this
}

export {splitting}
