import {Compress} from '@roots/bud-framework'

export const brotli: Compress.Config = function (options) {
  if (!options) return

  this.publish({
    'extension/compression-webpack-plugin-brotli/options': () =>
      options,
  })

  return this
}
