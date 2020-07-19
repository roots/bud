/**
 * Dev server
 */
const devServer = bud => ({
  bud,
  options: {
    devServer: bud.options.dev,
  },

  make: function () {
    this.preHook()
    this.postHook()

    return this.options
  },

  preHook: function () {
    this.bud.hooks.call('pre_devserver', {
      options: this.options,
      bud: this.bud,
    })
  },

  postHook: function () {
    this.bud.hooks.call('post_devserver', {
      options: this.options,
      bud: this.bud,
    })
  },
})

export {devServer}
