/**
 * Externals
 */
const externals = (bud: Bud) => ({
  bud,

  options: {
    externals: bud.state.options.externals,
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

import type {Bud} from '../bud'
