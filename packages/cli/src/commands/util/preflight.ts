import Bud from '@roots/bud-framework/lib/Bud'
import {injectClient} from '@roots/bud-server'

/**
 * Server setup
 */
export const dev = function (bud: Bud): void {
  bud.server
    .setCompiler(bud.compiler.getCompiler())
    .setConfig(bud.store['server'].repository)
    .addDevMiddleware()

  /*
    const serverConf = bud.server.getConfig()
    bud
    .when(serverConf.hot === true, bud.server.addHotMiddleware)
    .when(
      typeof serverConf.to?.host === 'string',
      bud.server.addProxyMiddleware,
    ) */
}

/**
 * Inject hmr loaders
 * @see bud-server
 */
export const inject: (bud: Bud) => void = bud => {
  const entrypoints = injectClient({
    entrypoints: bud.build.config.get('entry'),
  })

  bud.build.config.set('entry', entrypoints)
}

/**
 * Compile build.
 */
export const compile: () => void = () => {
  /**
   * Inject HMR entrypoints if running hot.
   */
  // bud.when(bud.options.get('server.hot'), () => inject(bud))
  /**
   * Configure and prime the webpack compiler
   */
  // bud.compiler.setConfig(bud.config(bud)).compile()
  /**
   * Run as dev?
   */
  // bud.when(bud.mode.is('development'), dev)
  /**
   * Run CLI.
   */
  /* app({
    name: bud.package.get('name'),
    compiler: bud.compiler,
    server: bud.server,
    terminate: bud.terminate,
    update: bud.update,
  }) */
}
