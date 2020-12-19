import {Webpack, Express} from '@roots/bud-typings'
import {webpackHotMiddleware} from '@roots/bud-support'

const hot = (
  compiler: Webpack.Compiler,
): Express.RequestHandler => {
  const options: webpackHotMiddleware.MiddlewareOptions = {
    log: false,
    path: '/__webpack_hmr',
    heartbeat: 1000,
  }

  return webpackHotMiddleware(compiler, options)
}

export {hot}
