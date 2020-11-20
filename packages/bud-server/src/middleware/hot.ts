import Framework from '@roots/bud-typings'
import WebpackHotMiddleware from 'webpack-hot-middleware'

const hot = (
  compiler: Framework.Webpack.Compiler,
): Framework.Express.RequestHandler => {
  const options: WebpackHotMiddleware.MiddlewareOptions = {
    log: false,
    path: '/__webpack_hmr',
    heartbeat: 1000,
  }

  return WebpackHotMiddleware(compiler, options)
}

export {hot}
