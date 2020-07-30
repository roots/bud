import type {Bud, Eslint} from './types'

const eslint: Eslint = function (enabled?: boolean): Bud {
  this.features.set({eslint: enabled ?? true})

  return this
}

export {eslint}
