import type {Bud} from './types'

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
    return this.options
  },
})

export {general}
