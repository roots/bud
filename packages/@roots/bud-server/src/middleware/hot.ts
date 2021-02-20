import {webpackHotMiddleware} from '@roots/bud-support'
import type {Webpack, Express} from '@roots/bud-typings'

const options: webpackHotMiddleware.MiddlewareOptions = {
  log: false,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000,
}

export const hot = (
  compiler: Webpack.Compiler,
): webpackHotMiddleware.EventStream & Express.Handler =>
  webpackHotMiddleware(compiler, options)
