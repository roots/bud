import {Config} from '..'

export const vendor: Config.Vendor = function (options) {
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
