import {Framework} from '@roots/bud-framework'

export const gzip: Framework.Compress.Gzip.Config = function (
  options,
) {
  this.options.enable('gzip')

  if (!options) return

  this.extensions
    .get('compression-webpack-plugin-gzip')
    .set('options', options)

  return this
}
