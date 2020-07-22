/**
 * Entrypoints
 *
 * @param {object} entry
 * @return {typeof import('webpack').entry} entry
 */
const entry = bud => ({
  bud,
  options: {
    entry: bud.state.options.entry,
  },

  make: function () {
    this.preHook()
    this.postHook()

    return this.options
  },

  preHook: function () {
    this.bud.hooks.call('pre_entry', this.options)
  },

  postHook: function () {
    this.bud.hooks.call('post_entry', this.options)
  },
})

export {entry}
