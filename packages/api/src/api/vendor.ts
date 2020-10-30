export const vendor: Framework.API.Vendor = function (options) {
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
