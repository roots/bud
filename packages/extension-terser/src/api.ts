import {Bud} from '@roots/bud'

export const terser: Bud.Terser.Configure = function (options) {
  this.options.enable('minify')

  const terserOptions = this.extensions
    .get('terser')
    .getOptions()

  Object.entries(options).map(([opt, val]) => {
    terserOptions.merge(opt, val)
  })

  return this
}
