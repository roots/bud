import WebpackHotMiddleware from 'webpack-hot-middleware'
import {Compiler} from 'webpack'
import {RequestHandler} from 'express'

const hot = (compiler: Compiler): RequestHandler => {
  const options: WebpackHotMiddleware.MiddlewareOptions = {
    path: `/__roots/hmr`,
    heartbeat: 2000,
    log: false,
  }

  return WebpackHotMiddleware(compiler, options)
}

export {hot as default}
