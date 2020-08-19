import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import type {Bud} from './types'
import type {WebpackOptimization} from '@roots/bud-typings'

type OptimizationBuilder = (bud: Bud) => WebpackOptimization

/**
 * Webpack optimization
 */
const optimization = (bud: Bud) => ({
  bud,

  supports: {
    minify: bud.features.enabled('minify'),
    runtimeChunk: bud.features.enabled('inlineManifest'),
    vendor: bud.features.enabled('vendor'),
  },

  target: {
    optimization: {
      minimize: bud.features.enabled('minify'),
      removeAvailableModules: false,
      removeEmptyChunks: false,
      moduleIds: 'hashed',
    },
  },

  splitChunksOptions: {
    cacheGroups: {
      vendor: {
        test: /node_modules/,
        name: bud.options.get('vendor').name,
        chunks: 'all',
        priority: -20,
      },
    },
  },

  runtimeChunkOptions: {
    name: entrypoint => `runtime/${entrypoint.name}`,
  },

  uglifyOptions: bud.options.get('uglify'),

  make: function () {
    this.when(this.bud.features.enabled('inlineManifest'), this.doRuntimeChunk)
    this.when(this.bud.features.enabled('vendor'), this.doVendor)
    this.when(this.bud.features.enabled('minify'), this.doMinimizer)

    this.target = this.bud.hooks.filter('optimization_target', this.target)
    this.bud.logger.info(
      {name: 'webpack.optimization', ...this.target},
      `webpack.optimization has been generated`,
    )

    return this.target
  },

  /**
   * Executes a callback if a given feature is enabled.
   */
  when: function (feature: boolean, callback: any): void {
    feature && callback(this)
  },

  /**
   * RuntimeChunk (inline manifest) support
   */
  doRuntimeChunk: function (context) {
    context.bud.hooks.call('webpack.optimization.runtimechunk.pre')

    context.target.optimization.runtimeChunk = context.bud.hooks.filter(
      'webpack.optimization.runtimechunk',
      context.runtimeChunkOptions,
    )

    context.bud.hooks.call('webpack.optimization.runtimechunk.post')
  },

  /**
   * Code splitting.
   */
  doVendor: function (context) {
    context.bud.hooks.call('webpack.optimization.splitchunks.pre')

    context.target.optimization.splitChunks = context.bud.hooks.filter(
      'webpack.optimization.splitchunks',
      context.splitChunksOptions,
    )

    context.bud.hooks.call('webpack.optimization.splitchunks.post')
  },

  /**
   * Minimization.
   */
  doMinimizer: function (context) {
    context.bud.hooks.call('webpack.optimization.minimizer.pre')

    if (!context.bud.features.enabled('terser')) {
      context.hooks.filter(
        'webpack.optimization.uglify',
        context.options.get('uglify'),
      )

      context.target.optimization.minimizer = context.bud.hooks.filter(
        'webpack.optimization.minimizer',
        [new UglifyJsPlugin(context.uglifyOptions)],
      )
    }

    context.bud.hooks.call('webpack.optimization.minimizer.post')
  },
})

export {optimization}
export type {OptimizationBuilder}
