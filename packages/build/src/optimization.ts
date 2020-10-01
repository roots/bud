import Bud from '@roots/bud-types'

/**
 * Webpack optimization
 */
const optimization: Bud.Build.Optimization = function () {
  return this.hooks.filter('optimization', {
    optimization: {
      ...(this.store['features'].enabled('runtimeChunk')
        ? {
            runtimeChunk: this.hooks.filter(
              'optimization.runtimeChunk',
              this.store['webpack'].get(
                'optimization.runtimeChunk',
              ),
            ),
          }
        : []),

      ...(this.store['features'].enabled('splitChunks')
        ? {
            splitChunks: {
              cacheGroups: {
                vendor: this.hooks.filter(
                  'optimization.splitChunks.cacheGroups.vendor',
                  this.store['webpack'].get(
                    'optimization.splitChunks.cacheGroups.vendor',
                  ),
                ),
              },
            },
          }
        : []),

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
