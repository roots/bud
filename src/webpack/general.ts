/**
 * General webpack options
 *
 * @this {bud}
 */
const general = (bud: Bud) => ({
  bud,
  options: {
    context: bud.state.paths.project,
    devtool: bud.state.features.sourceMap
      ? bud.state.options.devtool
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
    target: bud.state.options.target,
    watch: bud.state.features.watch,
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
import type {Bud} from '../bud'
