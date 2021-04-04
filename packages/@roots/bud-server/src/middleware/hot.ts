import {Server} from '@roots/bud-typings'
import WebpackHotMiddleware from 'webpack-hot-middleware'

const options: WebpackHotMiddleware.MiddlewareOptions = {
  log: false,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000,
}

export const hot: Server.Middleware.Init = ({compiler}) =>
  WebpackHotMiddleware(compiler, options)
