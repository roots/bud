import type {Bud} from './types'

type Vendor = (this: Bud, options?: any) => Bud

const vendor: Vendor = function (options) {
  this.features.set(
    'splitChunks',
    options && options.hasOwnProperty('enabled')
      ? options.enabled
      : true,
  )

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
export type {Vendor}
