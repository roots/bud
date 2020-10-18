export const compile: Framework.API.Compile = async function () {
  this.compiler.compile()

  this.when(
    this.mode.is('development'),
    this.server.addDevMiddleware,
  )

  this.when(this.server.config.hot, this.server.addHotMiddleware)

  this.when(
    this.server.config.proxy?.host,
    this.server.addProxyMiddleware,
  )

  this.app.run()
}
