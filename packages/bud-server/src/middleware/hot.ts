import {webpackHotMiddleware} from '@roots/bud-support'
import type {WebpackHotMiddleware} from '@roots/bud-support'
import type Framework from '@roots/bud-typings'

const options: WebpackHotMiddleware.MiddlewareOptions = {
  log: false,
  path: '/__webpack_hmr',
  heartbeat: 1000,
}

export const hot = (
  compiler: Framework.Webpack.Compiler,
): Framework.Express.RequestHandler =>
  webpackHotMiddleware(compiler, options)
