import type {Bud, Scss} from './types'

const scss: Scss = function (enabled: boolean): Bud {
  this.features.set('scss', enabled ?? true)

  return this
}

export {scss}
