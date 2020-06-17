const output = ({options, resolve}) => ({
  output: {
    path: resolve(options.dist),
    publicPath: options.inProduction ? `/${options.dist}` : `//${options.dev.host}:${options.dev.port}/${options.dist}/`,
    filename: options.hashed ? '[name].[hash].js' : '[name].js',
  },
})

module.exports = output
