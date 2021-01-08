"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compile = exports.dev = void 0;
/**
 * Server setup
 */
const dev = function () {
    /*
      bud.server
      .setCompiler(bud.compiler.get())
      .setConfig(bud.store['server'].repository)
      .addDevMiddleware()
  
      const serverConf = bud.server.getConfig()
      bud
      .when(serverConf.hot === true, bud.server.addHotMiddleware)
      .when(
        typeof serverConf.to?.host === 'string',
        bud.server.addProxyMiddleware,
      ) */
};
exports.dev = dev;
/**
 * Inject hmr loaders
 * @see bud-server
 */
/* export const inject: (bud: Framework) => void = bud => {
  const entrypoints = injectClient({
    entrypoints: bud.build.config.get('entry'),
  })

  bud.build.config.set('entry', entrypoints)
}
 */
/**
 * Compile build.
 */
const compile = () => {
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
};
exports.compile = compile;
//# sourceMappingURL=preflight.js.map