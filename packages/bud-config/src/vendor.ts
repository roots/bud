import Bud from '@roots/bud-types'

export const vendor: Bud.Config.Vendor = function (options) {
  this.features.enable('splitChunks')

  options &&
    this.options.set(
      'webpack.optimization.splitChunks.cacheGroups.vendor',
      {
        ...this.options.get(
          'webpack.optimization.splitChunks.cacheGroups.vendor',
        ),
        ...options,
      },
    )

  return this
}
