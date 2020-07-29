import type {Bud, Mini} from './types'

const mini: Mini = function (enable: boolean = true): Bud {
  this.state.features.minify = enable

  return this
}

export {mini}
