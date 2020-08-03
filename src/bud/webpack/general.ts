import type {Bud} from './types'

/**
 * General webpack options
 *
 * @this {bud}
 */
const general = (bud: Bud) => ({
  bud,

  target: {
    context: bud.paths.get('project'),
    devtool: bud.features.enabled('sourceMap') ? bud.options.get('devtool') : false,
    mode: bud.hooks.filter('webpack.mode', bud.mode),
    target: bud.hooks.filter('webpack.target', bud.options.get('target')),
    watch: bud.hooks.filter('webpack.watch', bud.features.enabled('watch')),
  },

  make: function () {
    this.target.context = bud.hooks.filter('webpack.context', this.target.context)
    this.target.devtool = bud.hooks.filter('webpack.devtool', this.target.devtool)
    this.target.mode = bud.hooks.filter('webpack.mode', this.target.mode)
    this.target.target = bud.hooks.filter('webpack.target', this.target.target)
    this.target.watch = bud.hooks.filter('webpack.watch', this.target.watch)
    this.target.stats = {
      version: true,
      hash: true,
      assets: true,
      errors: true,
      warnings: true,
    }

    /**
     * Empty out node globals that aren't native to web
     * to ensure they aren't inadvertently used in project bundles
     * intended for the browser..
     */
    if (this.bud.options.is('target', 'web')) {
      this.target.node = this.bud.hooks.filter('webpack.node', {
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

    this.target = this.bud.hooks.filter('webpack.general', this.target)
    this.bud.logger.info(
      {name: 'webpack.general', ...this.target},
      `webpack general config has been generated`,
    )
    return this.target
  },
})

export {general}
