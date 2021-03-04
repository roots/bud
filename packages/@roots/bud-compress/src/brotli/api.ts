import {Framework} from '@roots/bud-framework'

export const brotli: Framework.Compress.Brotli.Config = function (
  options,
) {
  if (!options) return

  this.extensions.set(
    'compression-webpack-plugin-brotli.options',
    options,
  )

  return this
}
