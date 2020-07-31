import type {Bud, Mini} from './types'

const mini: Mini = function (enable: boolean = true): Bud {
  this.features.set('minify', enable)

  return this
}

export {mini}
