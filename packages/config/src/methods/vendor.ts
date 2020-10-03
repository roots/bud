import {Config} from '..'

export const vendor: Config.Vendor = function (options) {
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
