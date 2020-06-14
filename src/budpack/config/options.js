const {isProduction, projectPath} = require ('./util')

const options = ({options}) => ({
  context: projectPath('src/'),
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? 'hidden-source-map' : 'cheap-module-source-map',
  watch: global.watch || false,
  stats: {
    all: false,
    assets: true,
    colors: true,
    errors: true,
    performance: true,
    timings: true,
    warnings: true,
  },
  ...options,
})

module.exports = options
