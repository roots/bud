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

  options: {
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
        test: /[\\/]node_modules[\\/]/,
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
    this.whenSupported('runtimeChunk', this.setRuntimeChunk)
    this.whenSupported('vendor', this.setSplitChunks)
    this.whenSupported('minify', this.setMinimizer)

    return this.options
  },

  /**
   * Executes a callback if a given feature is enabled.
   *
   * @property {Function} whenSupported
   * @parameter {string} bud.state.feature key
   * @parameter {Function} callback
   * @return {void}
   */
  whenSupported: function (feature: string, callback: any): void {
    this.currentCallback = callback
    this.supports[feature] && this.currentCallback()
  },

  /**
   * RuntimeChunk (inline manifest) support
   */
  setRuntimeChunk: function () {
    this.doHook('pre_runtimechunk')
    this.options.optimization.runtimeChunk = this.bud.hooks.filter(
      'filter_optimization_runtime_options',
      this.runtimeChunkOptions,
    )
    this.doHook('post_runtimechunk')
  },

  /**
   * Code splitting.
   */
  setSplitChunks: function () {
    this.doHook('pre_splitchunks')
    this.options.optimization.splitChunks = this.bud.hooks.filter(
      'filter_optimization_splitchunks_options',
      this.splitChunksOptions,
    )
    this.doHook('post_splitchunks')
  },

  /**
   * Minimization.
   */
  setMinimizer: function () {
    this.doHook('pre_minimizer', this)
    if (!this.bud.features.enabled('terser')) {
      this.options.optimization.minimizer = this.bud.hooks.filter(
        'filter_optimization_minimizer',
        [this.uglify()],
      )
    }
    this.doHook('post_minimizer', this)
  },

  /**
   * Uglify (terser is implemented as a webpack plugin)
   */
  uglify: function () {
    this.doHook('pre_uglify', this)
    const uglify = new UglifyJsPlugin(this.uglifyOptions)
    this.doHook('post_uglify', this)

    return uglify
  },

  doHook: function (name: any, ...params: any) {
    this.bud.hooks.call(`webpack_optimization_${name}`, this, params)
  },
})

export {optimization}
