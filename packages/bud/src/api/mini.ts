import type {Bud, Mini} from './types'

const mini: Mini = function (enable = true): Bud {
  this.features.set('minify', enable)

  return this
}

export {mini}
