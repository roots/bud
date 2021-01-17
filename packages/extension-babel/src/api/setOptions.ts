import type {Bud} from '@roots/bud'

export const setOptions: Bud.Babel.SetOptions = function (opts) {
  this.build.merge('items.babel.options', opts)

  return this
}
