import type {Hash} from './types'

const hash: Hash = function (enabled = true) {
  this.features.set('hash', enabled)

  return this
}

export {hash}
