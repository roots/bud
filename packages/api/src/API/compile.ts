export const compile: Framework.API.Compile = function (
  this: Framework.Bud,
) {
  this.compiler.compile()

  this.mode.is('development') && this.server.addDevMiddleware()
  this.features.enabled('hot') && this.server.addHotMiddleware()
  this.features.enabled('proxy') &&
    this.server.addProxyMiddleware()

  this.cli.run()
}
