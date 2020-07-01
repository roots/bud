/**
 * Webpack output.
 */
const output = options => ({
  output: {
    path: options.dist,
    publicPath: `${options.dist}/`,
    filename: options.hashed ? '[name].[hash].js' : '[name].js',
  },
})

module.exports = output
