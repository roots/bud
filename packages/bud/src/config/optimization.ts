import type {Bud} from './types'
import type {WebpackOptimization} from '@roots/bud-typings'

type OptimizationBuilder = (bud: Bud) => WebpackOptimization

/**
 * Webpack optimization
 */
const optimization: OptimizationBuilder = bud =>
  bud.hooks.filter('webpack.optimization', {
    optimization: {
      ...(bud.features.enabled('runtimeChunk')
        ? {
            runtimeChunk: bud.hooks.filter(
              'webpack.optimization.runtimeChunk',
              bud.options.get('webpack.optimization.runtimeChunk'),
            ),
          }
        : []),
      ...(bud.features.enabled('splitChunks')
        ? {
            splitChunks: {
              cacheGroups: {
                vendor: bud.hooks.filter(
                  'webpack.optimization.splitChunks.cacheGroups.vendor',
                  bud.options.get(
                    'webpack.optimization.splitChunks.cacheGroups.vendor',
                  ),
                ),
              },
            },
          }
        : []),
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
