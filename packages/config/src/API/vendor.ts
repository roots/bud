export const vendor: API.Vendor = function (options) {
  this.store['features'].enable('splitChunks')

  options &&
    this.store['build'].set(
      'optimization.splitChunks.cacheGroups.vendor',
      {
        ...this.store['build'].get(
          'webpack.optimization.splitChunks.cacheGroups.vendor',
        ),
        ...options,
      },
    )

  return this
}
