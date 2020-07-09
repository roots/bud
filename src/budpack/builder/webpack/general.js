/**
 * General webpackery.
 */
const general = ({paths, mode, features, options}) => ({
  context: paths.project,
  devtool: features.sourceMap ? options.devtool : false,
  mode,
  target: options.target,
  watch: features.watch,
})

export {general}
