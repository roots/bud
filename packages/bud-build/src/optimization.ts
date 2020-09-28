import Bud from '@roots/bud-types'

/**
 * Webpack optimization
 */
const optimization: Bud.Build.Optimization = function () {
  return this.hooks.filter('webpack.optimization', {
    optimization: {
      ...(this.features.enabled('runtimeChunk')
        ? {
            runtimeChunk: this.hooks.filter(
              'webpack.optimization.runtimeChunk',
              this.options.get(
                'webpack.optimization.runtimeChunk',
              ),
            ),
          }
        : []),

      ...(this.features.enabled('splitChunks')
        ? {
            splitChunks: {
              cacheGroups: {
                vendor: this.hooks.filter(
                  'webpack.optimization.splitChunks.cacheGroups.vendor',
                  this.options.get(
                    'webpack.optimization.splitChunks.cacheGroups.vendor',
                  ),
                ),
              },
            },
          }
        : []),

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

export {optimization as default}
