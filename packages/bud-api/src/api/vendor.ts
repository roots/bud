export const vendor: Framework.API.Vendor = function (options) {
  options &&
    this.config.set(
      'optimization.splitChunks.cacheGroups.vendor',
      {
        ...this.config.get(
          'webpack.optimization.splitChunks.cacheGroups.vendor',
        ),
        ...options,
      },
    )

  return this
}
