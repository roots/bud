import type {Bud, SourceMap} from './types'

const map: SourceMap = function (enabled: boolean = true): Bud {
  this.state.features.sourceMap = enabled ?? true

  return this
}

export {map}
