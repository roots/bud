import {Bud, Webpack} from '@roots/bud-typings'

export type Optimization = Webpack.Configuration['optimization']

export namespace Optimization {
  export type Build = (
    this: Bud.Contract,
  ) => {optimization: Optimization}
}

/** Annoying to type */
const key = val =>
  `webpack.optimization${val.map(
    v => `${val.length > 1 ? '.' : ''}${v}`,
  )}`

export const optimization: Optimization.Build = function () {
  // Runtime chunk
  const runtimeChunk = this.features.enabled(`runtimeChunk`)
    ? this.hooks.filter<Optimization['runtimeChunk']>(
        key`runtimeChunk`,
        this.config.get(`optimization.runtimeChunk`),
      )
    : false

  // Vendor cacheGroup
  const vendor = this.features.enabled(`vendor`)
    ? this.hooks.filter<
        any
        // Webpack.Options.SplitChunksOptions.CacheGroups.vendor ??
      >(
        key`splitChunks.cacheGroups.vendor`,
        this.config.get(
          `optimization.splitChunks.cacheGroups.vendor`,
        ),
      )
    : false

  // Main
  return this.hooks.filter<{optimization: Optimization}>(key``, {
    optimization: {
      // See above
      runtimeChunk,

      // See above
      splitChunks: {
        cacheGroups: {
          vendor,
        },
      },

      minimize: this.hooks.filter<Optimization['minimize']>(
        key`minimize`,
        this.features.enabled(`minify`),
      ),

      removeAvailableModules: this.hooks.filter<
        Optimization['removeAvailableModules']
      >(
        key`removeAvailableModules`,
        this.config.get('optimization.removeAvailableModules'),
      ),

      moduleIds: this.hooks.filter<Optimization['moduleIds']>(
        key`moduleIds`,
        this.config.get('optimization.moduleIds'),
      ),
    },
  })
}
