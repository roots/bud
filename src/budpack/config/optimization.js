const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

/**
 * Webpack optimization
 */
const optimization = ({options}) => {
  const config = {
    optimization: {
      minimize: options.minified,
      noEmitOnErrors: true,
    },
  }

  if (! options.vendor.disabled) {
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
        extractComments: true,
        parallel: true,
        uglifyOptions: {
          output: {
            beautify: false,
          },
          compress: {
            dev: false,
            production: false,
          },
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
