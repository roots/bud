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
          chunks: 'initial',
        },
      },
    }
  }

  if (options.minified) {
    config.optimization.minimizer = [
      new UglifyJsPlugin(),
    ]
  }

  return config
}

module.exports = optimization
