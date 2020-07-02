/**
 * General webpackery.
 */
const general = ({
  project,
  inProduction,
  watching,
  mapped,
  devtool,
}) => ({
  context: project,
  devtool: mapped ? devtool : false,
  mode: inProduction ? 'production' : 'development',
  target: 'web',
  watch: watching,
})

export default general
