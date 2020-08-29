import type {Bud} from './types'

type Vendor = (this: Bud, options?: any) => Bud

const vendor: Vendor = function (options) {
  if (options?.hasOwnProperty('enabled')) {
    this.features.set('splitChunks', options.enabled)

    delete options.enabled
  } else {
    this.features.enable('splitChunks')
  }

  options &&
    this.options.merge(
      'webpack.optimization.splitChunks.cacheGroups.vendor',
      options,
    )

  return this
}

export {vendor}
export type {Vendor}
