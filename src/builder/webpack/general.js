/**
 * General webpack options
 *
 * @this {bud}
 */
const general = bud => ({
  bud,
  options: {
    context: bud.paths.project,
    devtool: bud.features.sourceMap
      ? bud.options.devtool
      : false,
    mode: bud.mode,
    node: {
      module: 'empty',
      dgram: 'empty',
      dns: 'mock',
      fs: 'empty',
      http2: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty',
    },
    target: bud.options.target,
    watch: bud.features.watch,
  },

  make: function () {
    this.preHook()
    this.postHook()

    return this.options
  },

  preHook: function () {
    this.bud.hooks.call('pre_options', this.output)
  },

  postHook: function () {
    this.bud.hooks.call('post_options', this.output)
  },
})

export {general}
