export const vendor: Api.Vendor = function (options) {
  this.features.enable('splitChunks')

  options &&
    this.build.config.set(
      'optimization.splitChunks.cacheGroups.vendor',
      {
        ...this.build.config.get(
          'webpack.optimization.splitChunks.cacheGroups.vendor',
        ),
        ...options,
      },
    )

  return this
}
