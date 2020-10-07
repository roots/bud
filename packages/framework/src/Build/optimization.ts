/**
 * Webpack optimization
 */
const optimization: Build.Optimization = function ({
  optimization,
}) {
  const runtimeChunk = this.store['features'].enabled(
    'runtimeChunk',
  )
    ? this.hooks.filter(
        'optimization.runtimeChunk',
        optimization.runtimeChunk,
      )
    : false

  const vendor = this.store['features'].enabled('vendor')
    ? this.hooks.filter(
        'optimization.splitChunks.cacheGroups.vendor',
        optimization.splitChunks.cacheGroups.vendor,
      )
    : false

  return this.hooks.filter('optimization', {
    optimization: {
      runtimeChunk,

      splitChunks: {
        cacheGroups: {
          vendor,
        },
      },

      minimize: this.hooks.filter(
        'optimization.minimize',
        this.store['features'].enabled('minify'),
      ),

      removeAvailableModules: this.hooks.filter(
        'optimization.removeAvailableModules',
        false,
      ),

      moduleIds: this.hooks.filter(
        'optimization.moduleIds',
        'hashed',
      ),
    },
  })
}

export {optimization as default}
