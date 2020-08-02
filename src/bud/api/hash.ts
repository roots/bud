import type {Hash} from './types'

const hash: Hash = function (enabled: boolean = true) {
  this.logger.info({enabled}, `[api] bud.hash called`)

  this.features.set('hash', enabled)

  return this
}

export {hash}
