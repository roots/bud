/**
 * General webpackery.
 */
const general = ({paths, mode, features, options}) => ({
  context: paths.project,
  devtool: features.sourceMap ? options.devtool : false,
  mode,
  target: 'web',
  watch: features.watch,
})

export {general}
