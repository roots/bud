export const optimization: Framework.Build.Optimization = function ({
  optimization,
}) {
  const runtimeChunk = this.features.enabled('runtimeChunk')
    ? this.hooks.filter(
        'optimization.runtimeChunk',
        optimization.runtimeChunk,
      )
    : false

  const vendor = this.features.enabled('vendor')
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
        this.features.enabled('minify'),
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
