import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import type {Bud} from './types'
import type {WebpackOptimization} from '@roots/bud-typings'

type OptimizationBuilder = (bud: Bud) => WebpackOptimization

/**
 * Webpack optimization
 */
const optimization: OptimizationBuilder = bud =>
  bud.hooks.filter('webpack.optimization', {
    optimization: {
      runtimeChunk: bud.hooks.filter(
        'webpack.optimization.runtimeChunk',
        bud.features.enabled('inlineManifest')
          ? {
              name: entrypoint => `runtime/${entrypoint.name}`,
            }
          : false,
      ),
      splitChunks: bud.hooks.filter(
        'webpack.optimization.splitChunks',
        bud.features.enabled('vendor')
          ? {
              cacheGroups: {
                vendor: {
                  test: /node_modules/,
                  name: bud.options.get('vendor.name'),
                  chunks: 'all',
                  priority: -20,
                },
              },
            }
          : false,
      ),
      minimize: bud.hooks.filter(
        'webpack.optimization.minimize',
        bud.features.enabled('minify'),
      ),
      minimizer: bud.hooks.filter('webpack.optimization.minimizer', [
        new UglifyJsPlugin(bud.options.get('uglify')),
      ]),
      removeAvailableModules: bud.hooks.filter(
        'webpack.optimization.removeAvailableModules',
        false,
      ),
      removeEmptyChunks: bud.hooks.filter(
        'webpack.optimization.removeEmptyChunks',
        false,
      ),
      moduleIds: bud.hooks.filter('webpack.optimization.moduleIds', 'hashed'),
    },
  })

export {optimization}
export type {OptimizationBuilder}
