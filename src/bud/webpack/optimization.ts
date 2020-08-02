import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import type {Bud} from './types'

/**
 * Webpack optimization
 * @type {function} optimization
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
    cacheGroups: bud.hooks.filter('optimization_cachegroups', {
      vendor: bud.hooks.filter('optimization_cachegroups_vendor', {
        test: /node_modules/,
        name: bud.options.get('vendor').name,
        chunks: 'all',
        priority: -20,
      }),
    }),
  },

  runtimeChunkOptions: {
    name: entrypoint => `runtime/${entrypoint.name}`,
  },

  uglifyOptions: bud.hooks.filter(
    'optimization_uglify_options',
    bud.options.get('uglify'),
  ),

  make: function () {
    this.when(this.bud.features.enabled('inlineManifest'), this.doRuntimeChunk)
    this.when(this.bud.features.enabled('vendor'), this.doVendor)
    this.when(this.bud.features.enabled('minify'), this.doMinimizer)

    this.target = this.bud.hooks.filter('optimization_target', this.target)
    this.bud.logger.info(
      {name: 'webpack_optimization', ...this.target},
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
    context.bud.hooks.call('pre_optimization_runtimechunk')

    context.target.optimization.runtimeChunk = context.bud.hooks.filter(
      'optimization_runtimechunk',
      context.runtimeChunkOptions,
    )

    context.bud.hooks.call('post_optimization_runtimechunk')
  },

  /**
   * Code splitting.
   */
  doVendor: function (context) {
    context.bud.hooks.call('pre_optimization_splitchunks')

    context.target.optimization.splitChunks = context.bud.hooks.filter(
      'optimization_splitchunks',
      context.splitChunksOptions,
    )

    context.bud.hooks.call('post_optimization_splitchunks')
  },

  /**
   * Minimization.
   */
  doMinimizer: function (context) {
    context.bud.hooks.call('pre_optimization_minimizer')

    if (!context.bud.features.enabled('terser')) {
      context.target.optimization.minimizer = context.bud.hooks.filter(
        'optimization_minimizer',
        [new UglifyJsPlugin(context.uglifyOptions)],
      )
    }

    context.bud.hooks.call('post_optimization_minimizer')
  },
})

export {optimization}
