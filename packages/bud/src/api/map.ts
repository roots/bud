import {Api} from '@roots/bud-typings'

const map: Api.Map = function (enabled = true) {
  this.features.set('sourceMap', enabled ?? true)

  return this
}

export {map}
