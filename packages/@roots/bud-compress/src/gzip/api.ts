import {Framework} from '@roots/bud-framework'

export const gzip: Framework.Compress.Config = function (
  options,
) {
  if (!options) return

  this.publish({
    'extension/compression-webpack-plugin-gzip/options': () =>
      options,
  })

  return this
}
