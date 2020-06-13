const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const {isProduction} = require('./util')

/**
 * Webpack optimization
 */
const optimization = ({optimization}) => ({
  optimization: {
    minimize: true,
    noEmitOnErrors: isProduction,
    minimizer: isProduction ? [new UglifyJsPlugin()] : [],
    ...optimization,
  },
})

module.exports = optimization
