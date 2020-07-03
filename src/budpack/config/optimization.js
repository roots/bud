const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

/**
 * Webpack optimization
 */
const optimization = options => {
  const config = {
    optimization: {
      runtimeChunk: {
        name: 'runtime',
      },
      minimize: options.minified,
      noEmitOnErrors: true,
      removeAvailableModules: false,
      removeEmptyChunks: false,
    },
  }

  if (options.vendor) {
    config.optimization.splitChunks = {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
      chunks (chunk) {
        return chunk.name !== 'editor';
      }
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
