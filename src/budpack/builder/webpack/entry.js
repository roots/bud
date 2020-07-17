/**
 * Entrypoints
 *
 * @param {object} entry
 * @return {typeof import('webpack').entry} entry
 */
const entry = bud => ({
  bud,
  options: {
    entry: {},
  },
  output: {},

  init: function () {
    this.options.entry = this.bud.options.entry

    return this
  },

  make: function () {
    this.pre()
    this.output = this.options
    this.post()

    return this.options
  },

  pre: function () {
    this.bud.hooks.call('pre_entry', this)
  },

  post: function () {
    this.bud.hooks.call('post_entry', this.output)
  },
})

export {entry}
