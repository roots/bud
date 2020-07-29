import type {Hash} from './types'

const hash: Hash = function (enabled: boolean = true) {
  this.features.set({hash: enabled})

  return this
}

export {hash}
