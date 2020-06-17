const options = ({inProduction, options}) => ({
  context: options.project,
  mode: inProduction ? 'production' : 'development',
  devtool: (
    options.mapped ? 'cheap-module-source-map' : false
  ),
  watch: options.watching,
})

module.exports = options
