const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

/**
 * Webpack optimization
 */
const optimization = ({options}) => ({
  optimization: {
    minimize: options.minified,
    noEmitOnErrors: true,
    minimizer: options.minified ? [new UglifyJsPlugin()] : [],
  },
})

module.exports = optimization
