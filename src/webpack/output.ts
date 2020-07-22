/**
 * Webpack output.
 */
const output = bud => ({
  bud,

  options: {
    output: {
      path: bud.paths.dist,
      publicPath: bud.paths.public,
      filename: bud.features.hash
        ? '[name].[hash:8].js'
        : '[name].js',
    },
  },

  make: function () {
    return this.options
  },
})

export {output}
