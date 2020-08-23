import type {Bud} from './Types'

type Vendor = (this: Bud, options?: any) => Bud

const vendor: Vendor = function (options) {
  this.features.enable('vendor')

  options &&
    this.options.set(
      'webpack.optimization.splitChunks.cacheGroup.vendor',
      {
        ...this.options.get(
          'webpack.optimization.splitChunks.cacheGroup.vendor',
        ),
        ...options,
      },
    )

  return this
}

export {vendor}
export type {Vendor}
