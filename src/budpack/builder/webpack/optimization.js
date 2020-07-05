import UglifyJsPlugin from 'uglifyjs-webpack-plugin'

/**
 * Webpack optimization
 */
const optimization = ({features, options}) => {
  const config = {
    optimization: {
      runtimeChunk: {
        name: 'runtime',
      },
      minimize: features.minified,
      noEmitOnErrors: true,
      removeAvailableModules: false,
      removeEmptyChunks: false,
    },
  }

  if (features.vendor) {
    config.optimization.splitChunks = {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      }
    }
  }

  if (features.minified) {
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
