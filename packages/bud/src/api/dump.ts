import type {Bud, Dump} from './types'

const dump: Dump = function (enabled = true): Bud {
  this.logger.info(
    {name: 'bud.api', function: 'bud.dump', enabled},
    `bud.dump called`,
  )

  this.features.set('dump', enabled)

  return this
}

export {dump}
