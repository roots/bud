const {globber} = require('./util')

/**
 * Webpack Entrypoints
 */
const devServer = ({devServer}) => ({
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    disableHostCheck: true,
    host: 'localhost',
    hot: true,
    watchOptions: {
      aggregateTimeout: 300,
    },
    stats: {
      all: false,
      assets: true,
      colors: true,
      errors: true,
      performance: true,
      timings: true,
      warnings: true,
    },
    port: devServer.port,
  },
})

module.exports = devServer
