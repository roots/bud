import {Bud} from '@roots/bud'

export const gzip: Bud.Compress.Gzip.Config = function (
  options,
) {
  this.options.enable('gzip')

  if (!options) return

  this.extensions
    .get('compression-webpack-plugin-gzip')
    .set('options', options)

  return this
}
