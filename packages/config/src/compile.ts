import Bud from '@roots/bud-types'
import {injectClient} from '@roots/bud-server'

export const compile: Bud.Config.Compile = async function (
  this: Bud,
): Promise<void> {
  this.when(this.store['server'].get('hot'), inject.bind(this))

  this.compiler.setConfig(this.build()).compile()

  this.when(this.mode.is('development'), dev.bind(this))

  /**
   * Run CLI.
   *
   * We have to get at the CLI in a kind of roundabout way
   * in order to sidestep making a circular
   * dependency: @roots/bud => @roots/bud-cli => @roots/bud
   */
  const {default: app} = await import('@roots/bud-cli')

  app({
    name: this.store['package'].get('name') ?? '@roots/bud',
    compiler: this.compiler,
    server: this.server,
  })
}

/**
 * Inject hmr loaders
 */
function inject(): void {
  const entrypoints = injectClient({
    entrypoints: this.store['webpack'].get('entry'),
  })

  this.store['webpack'].set('entry', entrypoints)
}

/**
 * setup devServer
 */
function dev(this: Bud): void {
  this.server
    .setCompiler(this.compiler.getCompiler())
    .setConfig(this.store['server'].repository)
    .addDevMiddleware()

  const {hot, to} = this.server.getConfig()

  this.when(hot, this.server.addHotMiddleware).when(
    typeof to?.host === 'string',
    this.server.addProxyMiddleware,
  )
}
