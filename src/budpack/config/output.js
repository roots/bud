/**
 * Webpack output.
 */
const output = ({options}) => ({
  output: {
    path: options.distPath,
    publicPath: options.inProduction
      ? options.public
      : `//${options.dev.host}:${options.dev.port}/${options.public}/`,
    filename: options.hashed
      ? '[name].[hash].js'
      : '[name].js',
  },
})

module.exports = output
