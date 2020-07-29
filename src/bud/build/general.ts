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
    devtool: bud.features.enabled('sourceMap')
      ? bud.options.get('devtool')
      : false,
    mode: bud.mode,
    target: bud.options.get('target'),
    watch: bud.features.enabled('watch'),
  },

  make: function () {
    /**
     * Empty out non web globals so they aren't
     * inadvertently used in project bundles.
     */
    if (this.bud.options.is('target', 'web')) {
      this.options.node = {
        module: 'empty',
        dgram: 'empty',
        dns: 'mock',
        fs: 'empty',
        http2: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty',
      }
    }
    return this.options
  },
})

export {general}
