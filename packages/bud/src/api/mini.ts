import {Api} from '@roots/bud-typings'

const mini: Api.Mini = function () {
  this.features.enable('minify')

  return this
}

export {mini}
