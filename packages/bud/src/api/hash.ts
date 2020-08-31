import type {Hash} from './types'

const hash: Hash = function (options: {enabled}) {
  this.features.set('hash', options?.enabled ?? true)

  return this
}

export {hash}
