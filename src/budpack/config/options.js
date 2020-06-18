/**
 * General webpackery.
 */
const options = ({options}) => {
  const config = {
    context: options.project,
    mode: options.inProduction ? 'production' : 'development',
    watch: options.watching,
  }

  if (options.mapped) {
    config.devtool = 'cheap-module-source-map'
  }

  return config
}

module.exports = options
