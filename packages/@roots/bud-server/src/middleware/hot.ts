import type {Server} from '@roots/bud-framework'
import type * as Webpack from 'webpack'
import WebpackHotMiddleware from 'webpack-hot-middleware'

const options: WebpackHotMiddleware.MiddlewareOptions = {
  log: false,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000,
}

export const hot: Server.Middleware.Init = ({
  compiler,
}: {
  compiler: Webpack.Compiler | Webpack.MultiCompiler
}) => WebpackHotMiddleware(compiler, options)
