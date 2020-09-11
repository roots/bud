import {Api} from '@roots/bud-types'

const mini: Api.Mini = function () {
  this.features.enable('minify')

  return this
}

export {mini}
