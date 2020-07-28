import type {Hash} from './types'

const hash: Hash = function (enabled = true) {
  this.state.features.hash = enabled

  return this
}

export {hash}
