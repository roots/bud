import {Framework} from '@roots/bud-framework'

export const brotli: Framework.Compress.Brotli.Config = function (
  options,
) {
  this.options.set('brotli', true)

  if (!options) return

  this.extensions
    .get('compression-webpack-plugin-brotli')
    .set('options', options)

  return this
}
