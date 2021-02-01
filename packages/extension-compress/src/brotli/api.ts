import {Bud} from '@roots/bud'

export const brotli: Bud.Compress.Brotli.Config = function (
  options,
) {
  this.options.set('brotli', true)

  if (!options) return

  this.extensions
    .get('compression-webpack-plugin-brotli')
    .set('options', options)

  return this
}
