import type {Hash} from './types'

const hash: Hash = function (enabled = true) {
  this.logger.info(
    {name: 'bud.api', function: 'bud.hash', enabled},
    `bud.hash called`,
  )

  this.features.set('hash', enabled)

  return this
}

export {hash}
