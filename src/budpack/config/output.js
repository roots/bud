/**
 * Webpack output.
 */
const output = (dist, hashed) => ({
  output: {
    path: dist,
    publicPath: `${dist}/`,
    filename: hashed
      ? '[name].[hash].js'
      : '[name].js',
  },
})

module.exports = output
