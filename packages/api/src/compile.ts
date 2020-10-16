import {injectClient} from '@roots/bud-server/lib/Server/injectClient'

export const compile: Api.Compile = async function (): Promise<void> {
  this.when(this.server.config?.hot, inject.bind(this))

  const config = this.build.compile()

  this.compiler.setConfig(config)
  this.compiler.compile()

  this.when(this.mode.is('development'), dev.bind(this))

  /**
   * Run CLI.
   *
   * We have to get at the CLI in a kind of roundabout way
   * in order to sidestep making a circular
   * dependency: @roots/bud => @roots/bud-cli => @roots/bud
   */
  const {default: app} = await import(
    require.resolve('@roots/bud-cli')
  )

  app({bud: this})
}

/**
 * Inject hmr loaders
 */
function inject(): void {
  const entrypoints = injectClient({
    entrypoints: this.build.config.get('entry'),
  })

  this.build.config.set('entry', entrypoints)
}

/**
 * setup devServer
 */
function dev(): void {
  this.server.setCompiler(this.compiler.getCompiler())
  this.server.addDevMiddleware()

  const {hot, to} = this.server.getConfig()

  this.when(hot, this.server.addHotMiddleware).when(
    typeof to?.host === 'string',
    this.server.addProxyMiddleware,
  )
}
