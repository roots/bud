import type {Bud} from './types'

/**
 * General webpack options
 *
 * @this {bud}
 */
const general = (bud: Bud) => ({
  bud,

  options: {
    context: bud.hooks.filter('webpack_context', bud.paths.get('project')),
    devtool: bud.hooks.filter('webpack_devtool', bud.features.enabled('sourceMap') ? bud.options.get('devtool') : false),
    mode: bud.hooks.filter('webpack_mode', bud.mode),
    target: bud.hooks.filter('webpack_target', bud.options.get('target')),
    watch: bud.hooks.filter('webpack_watch', bud.features.enabled('watch')),
  },

  make: function () {
    /**
     * Empty out node globals that aren't native to web
     * to ensure they aren't inadvertently used in project bundles
     * intended for the browser..
     */
    if (this.bud.options.is('target', 'web')) {
      this.options.node = this.bud.hooks.filter('webpack_node', {
        module: 'empty',
        dgram: 'empty',
        dns: 'mock',
        fs: 'empty',
        http2: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty',
      })
    }

    return this.bud.hooks.filter('webpack_general_final', this.options)
  },
})

export {general}
