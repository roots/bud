import UglifyJsPlugin from 'uglifyjs-webpack-plugin'

/**
 * Webpack optimization
 */
const optimization = bud => {
  const config = {
    optimization: {
      minimize: bud.features.minified,
      removeAvailableModules: false,
      removeEmptyChunks: false,
      moduleIds: 'hashed',
    },
  }

  if (bud.features.inlineManifest) {
    config.optimization.runtimeChunk = {
      name: entrypoint => `runtime/${entrypoint.name}`,
    }
  }

  if (bud.features.vendor) {
    config.optimization.splitChunks = {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: bud.options.vendor.name,
          chunks: 'all',
          priority: -20,
        },
      },
    }
  }

  if (bud.features.minified) {
    config.optimization.minimizer = [
      new UglifyJsPlugin({
        cache: true,
        chunkFilter: ({name}) => name === 'vendor',
        extractComments: false,
        parallel: true,
        uglifyOptions: {
          output: {
            beautify: false,
          },
          compress: false,
          mangle: {
            toplevel: true,
          },
        },
      }),
    ]
  }

  return config
}

export {optimization}
