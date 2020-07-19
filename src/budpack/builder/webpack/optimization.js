import UglifyJsPlugin from 'uglifyjs-webpack-plugin'

/**
 * Webpack optimization
 */
const optimization = bud => ({
  bud,

  supports: {
    minification: bud.features.minified,
    runtimeChunk: bud.features.inlineManifest,
    vendor: bud.features.vendor,
  },

  options: {
    optimization: {
      minimize: bud.features.minified,
      removeAvailableModules: false,
      removeEmptyChunks: false,
      moduleIds: 'hashed',
    },
  },

  splitChunksOptions: {
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: bud.options.vendor.name,
        chunks: 'all',
        priority: -20,
      },
    },
  },

  runtimeChunkOptions: {
    name: entrypoint => `runtime/${entrypoint.name}`,
  },

  uglifyOptions: bud.options.uglify,

  make: function () {
    this.preHook()

    this.whenSupported('runtimeChunk', this.setRuntimeChunk)
    this.whenSupported('vendor', this.setSplitChunks)
    this.whenSupported('minimize', this.setMinimizer)

    this.postHook()
  },

  whenSupported: function (feature, callback) {
    this.currentCallback = callback
    this.supports[feature] && this.currentCallback()
  },

  setRuntimeChunk: function () {
    this.doHook('pre_runtimechunk')
    this.options.optimization.runtimeChunk = this.runtimeChunkOptions
    this.doHook('post_runtimechunk')
  },

  setSplitChunks: function () {
    this.doHook('pre_splitchunks')
    this.options.optimization.splitChunks = this.splitChunksOptions
    this.doHook('post_splitchunks')
  },

  setMinimizer: function () {
    this.doHook('pre_minimizer', this)
    this.options.optimization.minimizer = [this.uglify()]
    this.doHook('post_minimizer', this)
  },

  uglify: function () {
    this.doHook('pre_uglify', this)
    const uglify = new UglifyJsPlugin(this.uglifyOptions)
    this.doHook('post_uglify', this)

    return uglify
  },

  preHook: function () {
    this.bud.hooks.call(`pre_webpack_optimization`, this)
  },

  postHook: function () {
    this.bud.hooks.call(`post_webpack_optimization`, this)
  },

  doHook: function (name, ...params) {
    this.bud.hooks.call(
      `webpack_optimization_${name}`,
      this,
      params,
    )
  },
})

export {optimization}
