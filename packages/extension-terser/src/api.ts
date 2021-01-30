import {Bud} from '@roots/bud'

export const terser: Bud.Terser.Configure = function (options) {
  this.options.enable('minify')

  this.extensions.get('terser').merge('options', options)

  return this
}
