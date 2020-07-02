const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

/**
 * Webpack optimization
 */
const optimization = options => {
  const config = {
    optimization: {
      minimize: options.minified,
      noEmitOnErrors: true,
      removeAvailableModules: false,
      removeEmptyChunks: false,
    },
  }

  if (options.vendor) {
    config.optimization.splitChunks = {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    }
  }

  if (options.minified) {
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

module.exports = optimization
