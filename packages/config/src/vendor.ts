import Bud from '@roots/bud-types'

export const vendor: Bud.Config.Vendor = function (options) {
  this.store['features'].enable('splitChunks')

  options &&
    this.store['webpack'].set(
      'optimization.splitChunks.cacheGroups.vendor',
      {
        ...this.store['webpack'].get(
          'webpack.optimization.splitChunks.cacheGroups.vendor',
        ),
        ...options,
      },
    )

  return this
}
