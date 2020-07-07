/**
 * Webpack output.
 */
const output = ({paths, features}) => ({
  output: {
    path: paths.dist,
    publicPath: paths.public,
    filename: features.hashed
      ? '[name].[hash].js'
      : '[name].js',
  },
})

module.exports = output
