import {BudInterface} from '@roots/bud'
import {injectClient} from '@roots/bud-server'
import app from '../..'

/**
 * Server setup
 */
export const dev = function (bud: BudInterface): void {
  bud.server
    .setCompiler(bud.compiler.getCompiler())
    .setConfig(bud.options.get('server'))
    .addDevMiddleware()

  const serverConf = bud.server.getConfig()

  bud
    .when(serverConf.hot === true, bud.server.addHotMiddleware)
    .when(
      typeof serverConf.to?.host === 'string',
      bud.server.addProxyMiddleware,
    )
}

/**
 * Inject hmr loaders
 * @see bud-server
 */
export const inject: (bud: BudInterface) => void = bud => {
  const entrypoints = injectClient({
    entrypoints: bud.options.get('webpack.entry'),
  })

  bud.options.set('webpack.entry', entrypoints)
}

/**
 * Compile build.
 */
export const compile: (bud: BudInterface) => void = bud => {
  /**
   * Inject HMR entrypoints if running hot.
   */
  bud.when(bud.options.get('server.hot'), () => inject(bud))

  /**
   * Configure and prime the webpack compiler
   */
  bud.compiler.setConfig(bud.config(bud)).compile()

  /**
   * Run as dev?
   */
  bud.when(bud.mode.is('development'), dev)

  /**
   * Run CLI.
   */
  app({
    name: bud.package.get('name'),
    compiler: bud.compiler,
    server: bud.server,
    terminate: bud.terminate,
    update: bud.update,
  })
}
