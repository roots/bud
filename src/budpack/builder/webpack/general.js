/**
 * General webpack options
 *
 * @typedef {function () => {object}} general
 * @this {bud}
 */
const general = bud => ({
  bud,
  output: {},
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
    this.output = this.options
    this.hook()

    return this.output
  },

  hook: function () {
    this.bud.hooks.call('options', this.output)
  },
})

export {general}
