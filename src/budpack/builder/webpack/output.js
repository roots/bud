/**
 * Webpack output.
 */
const output = ({paths, features}) => ({
  output: {
    path: paths.dist,
    publicPath: paths.public,
    filename: features.hash
      ? '[name].[hash:8].chunk.js'
      : '[name].js',
  },
})

module.exports = output
