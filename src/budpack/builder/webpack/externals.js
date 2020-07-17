/**
 * Externals
 *
 * @typedef {function(bud: bud): object} externals
 */
const externals = bud => ({
  bud,
  options: {
    externals: bud.options.externals,
  },

  init: function () {
    this.options.externals = this.bud.options.externals

    return this
  },

  make: function () {
    this.pre()
    this.post()

    return this.options
  },

  pre: function () {
    this.bud.hooks.call('pre_externals', {
      options: this.options,
      bud: this.bud,
    })
  },

  post: function () {
    this.bud.hooks.call('post_externals', {
      options: this.options,
      bud: this.bud,
    })
  },
})

export {externals}
