const output = bud => ({
  output: {
    path: bud.resolve(bud.options.dist),
    publicPath: bud.options.inProduction ? `/${bud.options.dist}` : `//${bud.options.dev.host}:${bud.options.dev.port}/${bud.options.dist}/`,
    filename: bud.options.hashed ? '[name].[hash].js' : '[name].js',
  },
})

module.exports = output
