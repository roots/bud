import type {Bud} from './types'

/**
 * General webpack options
 *
 * @this {bud}
 */
const general = (bud: Bud) => ({
  bud,
  options: {
    context: bud.state.paths.src,
    devtool: bud.state.features.sourceMap
      ? bud.state.options.devtool
      : false,
    mode: bud.mode,
    node: bud.state.options.node,
    target: bud.state.options.target,
    watch: bud.state.features.watch,
  },

  make: function () {
    return this.options
  },
})

export {general}
