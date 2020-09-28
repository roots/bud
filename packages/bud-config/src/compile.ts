import Webpack from 'webpack'
import Bud from '@roots/bud-types'
import {injectClient} from '@roots/bud-server'

export const compile: Bud.Config.Compile = async function () {
  this.when(this.options.get('server.hot'), inject.bind(this))
  this.compiler
    .setConfig(this.build(this) as Webpack.Configuration)
    .compile()
  this.when(this.mode.is('development'), dev.bind(this))

  /**
   * Run CLI.
   *
   * We have to get at the CLI in a kind of roundabout way
   * in order to sidestep making a circular
   * dependency: @roots/bud => @roots/bud-cli => @roots/bud
   */
  const {default: app} = await import(
    this.disks.get('@roots').get('bud-cli')
  )

  app({
    name: this.package.get('name'),
    compiler: this.compiler,
    server: this.server,
    terminate: this.terminate,
    update: this.update,
  })
}

/**
 * Inject hmr loaders
 */
function inject(): void {
  const entrypoints = injectClient({
    entrypoints: this.options.get('webpack.entry'),
  })

  this.options.set('webpack.entry', entrypoints)
}

/**
 * setup devServer
 */
function dev(): void {
  this.server
    .setCompiler(this.compiler.getCompiler())
    .setConfig(this.options.get('server'))
    .addDevMiddleware()

  const {hot, to} = this.server.getConfig()

  this.when(hot, this.server.addHotMiddleware).when(
    typeof to?.host === 'string',
    this.server.addProxyMiddleware,
  )
}
