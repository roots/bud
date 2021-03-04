import {Framework} from '@roots/bud-framework'

export const gzip: Framework.Compress.Gzip.Config = function (
  options,
) {
  if (!options) return

  this.extensions.set(
    'compression-webpack-plugin-gzip.options',
    options,
  )

  return this
}
