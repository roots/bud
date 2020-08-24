import type {Bud} from './types'
import type {WebpackOptimization} from '@roots/bud-typings'

type OptimizationBuilder = (bud: Bud) => WebpackOptimization

/**
 * Webpack optimization
 */
const optimization: OptimizationBuilder = bud =>
  bud.hooks.filter('webpack.optimization', {
    optimization: {
      ...(bud.features.enabled('runtimeManifest')
        ? {
            runtimeChunk: bud.hooks.filter(
              'webpack.optimization.runtimeChunk',
              bud.options.get(
                'webpack.optimization.runtimeChunk.name',
              )
                ? {
                    name: entrypoint => `runtime/${entrypoint.name}`,
                  }
                : false,
            ),
          }
        : {}),
      splitChunks: bud.hooks.filter(
        'webpack.optimization.splitChunks',
        bud.features.enabled('splitChunks')
          ? bud.hooks.filter(
              'webpack.optimization.splitChunks.cacheGroups',
              {
                cacheGroups: {
                  vendor: {
                    test: bud.hooks.filter(
                      'webpack.optimization.splitChunks.cacheGroups.test',
                      bud.options.get(
                        'webpack.optimization.splitChunks.cacheGroups.test',
                      ),
                    ),
                    name: bud.hooks.filter(
                      'webpack.optimization.splitChunks.cacheGroups.name',
                      bud.options.get(
                        'webpack.optimization.splitChunks.cacheGroups.name',
                      ),
                    ),
                    chunks: bud.hooks.filter(
                      'webpack.optimization.splitChunks.cacheGroups.chunks',
                      bud.options.get(
                        'webpack.optimization.splitChunks.cacheGroups.chunks',
                      ),
                    ),
                    priority: bud.hooks.filter(
                      'webpack.optimization.splitChunks.cacheGroups.priority',
                      bud.options.get(
                        'webpack.optimization.splitChunks.cacheGroups.priority',
                      ),
                    ),
                  },
                },
              },
            )
          : false,
      ),
      minimize: bud.hooks.filter(
        'webpack.optimization.minimize',
        bud.features.enabled('minify'),
      ),
      removeAvailableModules: bud.hooks.filter(
        'webpack.optimization.removeAvailableModules',
        false,
      ),
      removeEmptyChunks: bud.hooks.filter(
        'webpack.optimization.removeEmptyChunks',
        false,
      ),
      moduleIds: bud.hooks.filter(
        'webpack.optimization.moduleIds',
        'hashed',
      ),
    },
  })

export {optimization}
export type {OptimizationBuilder}
