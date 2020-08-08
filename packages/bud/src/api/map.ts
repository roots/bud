import type {Bud, SourceMap} from './types'

const map: SourceMap = function (enabled = true): Bud {
  this.logger.info(
    {name: 'bud.api', function: 'bud.sourceMap', enabled},
    `bud.sourceMap called`,
  )

  this.features.set('sourceMap', enabled ?? true)

  return this
}

export {map}
