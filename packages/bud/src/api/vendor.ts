import {Api} from '@roots/bud-types'

const vendor: Api.Vendor = function (options) {
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

export {vendor}
