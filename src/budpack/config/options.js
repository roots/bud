/**
 * General webpackery.
 */
const options = ({
  project,
  inProduction,
  watching,
  mapped,
  devtool,
}) => ({
  context: project,
  mode: inProduction ? 'production' : 'development',
  watch: watching,
  devtool: mapped ? devtool : false,
})

module.exports = options
