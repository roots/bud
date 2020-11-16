import {Bud, Container, Webpack} from '@roots/bud-typings'

type Cfg = Webpack.Configuration['optimization']
type Optimization = (
  this: Bud.Contract,
  config: Container,
) => {optimization: Cfg}

/** Annoying to type */
const key = val =>
  `webpack.optimization${val.map(
    v => `${val.length > 1 ? '.' : ''}${v}`,
  )}`

export const optimization: Optimization = function(config) {
  // Runtime chunk
  const runtimeChunk = this.features.enabled(`runtimeChunk`)
    ? this.hooks.filter<Cfg['runtimeChunk']>(
        key`runtimeChunk`,
        config.get(`optimization.runtimeChunk`),
      )
    : false

  // Vendor cacheGroup
  const vendor = this.features.enabled(`vendor`)
    ? this.hooks.filter<
        any
        // Webpack.Options.SplitChunksOptions.CacheGroups.vendor ??
      >(
        key`splitChunks.cacheGroups.vendor`,
        config.get(
          `optimization.splitChunks.cacheGroups.vendor`,
        ),
      )
    : false

  // Main
  return this.hooks.filter<{optimization: Cfg}>(key``, {
    optimization: {
      // See above
      runtimeChunk,

      // See above
      splitChunks: {
        cacheGroups: {
          vendor,
        },
      },

      minimize: this.hooks.filter<Cfg['minimize']>(
        key`minimize`,
        this.features.enabled(`minify`),
      ),

      removeAvailableModules: this.hooks.filter<
        Cfg['removeAvailableModules']
      >(
        key`removeAvailableModules`,
        config.get('optimization.removeAvailableModules'),
      ),

      moduleIds: this.hooks.filter<Cfg['moduleIds']>(
        key`moduleIds`,
        config.get('optimization.moduleIds'),
      ),
    },
  })
}
