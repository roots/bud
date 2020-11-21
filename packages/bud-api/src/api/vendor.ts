export const vendor: Vendor = function (options) {
  this.features.enable('vendor')

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

export type Vendor<T = Framework.Bud.Contract> = (
  this: T,
  options?: any,
) => T
