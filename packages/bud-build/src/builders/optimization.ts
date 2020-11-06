export const optimization: Framework.Build.Optimization = function ({
  optimization,
}) {
  const runtimeChunk = this.features.enabled('runtimeChunk')
    ? this.hooks.filter(
        'webpack.optimization.runtimeChunk',
        optimization.runtimeChunk,
      )
    : false

  const vendor = this.features.enabled('vendor')
    ? this.hooks.filter(
        'webpack.optimization.splitChunks.cacheGroups.vendor',
        optimization.splitChunks.cacheGroups.vendor,
      )
    : false

  return this.hooks.filter('webpack.optimization', {
    optimization: {
      runtimeChunk,

      splitChunks: {
        cacheGroups: {
          vendor,
        },
      },

      minimize: this.hooks.filter(
        'webpack.optimization.minimize',
        this.features.enabled('minify'),
      ),

      removeAvailableModules: this.hooks.filter(
        'webpack.optimization.removeAvailableModules',
        false,
      ),

      moduleIds: this.hooks.filter(
        'webpack.optimization.moduleIds',
        'hashed',
      ),
    },
  })
}
