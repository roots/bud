/**
 * Dev server
 */
const devServer = bud => ({
  bud,
  options: {},
  init: function () {
    this.options = {
      devServer: this.bud.options.dev,
    }

    return this
  },

  make: function () {
    this.pre()
    this.post()

    return this.options
  },

  pre: function () {
    this.bud.hooks.call('pre_devserver', {
      options: this.options,
      bud: this.bud,
    })
  },

  post: function () {
    this.bud.hooks.call('post_devserver', {
      options: this.options,
      bud: this.bud,
    })
  },
})

export {devServer}
