import WebpackHotMiddleware from 'webpack-hot-middleware'

const hot = (
  compiler: Framework.Webpack.Compiler,
): Framework.Express.RequestHandler => {
  const options: WebpackHotMiddleware.MiddlewareOptions = {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 1000,
  }

  return WebpackHotMiddleware(compiler, options)
}

export {hot}
