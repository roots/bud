/**
 * Webpack output.
 */
const output = bud => ({
  output: {
    path: bud.paths.dist,
    publicPath: bud.paths.public,
    filename: bud.features.hash
      ? '[name].[hash:8].js'
      : '[name].js',
  },
})

export {output}
