/**
 * Webpack output.
 */
const output = bud => ({
  bud,
  options: {
    output: {},
  },

  init: function () {
    this.options.output = {
      path: this.bud.paths.dist,
      publicPath: this.bud.paths.public,
      filename: this.bud.features.hash
        ? '[name].[hash:8].js'
        : '[name].js',
    }

    return this
  },

  make: function () {
    this.pre()
    this.post()

    return this.options
  },

  pre: function () {
    this.bud.hooks.call('pre_output', {
      options: this.options,
      bud: this.bud,
    })
  },

  post: function () {
    this.bud.hooks.call('post_output', {
      options: this.options,
      bud: this.bud,
    })
  },
})

export {output}
