import type {Framework, Server} from '@roots/bud-framework'
import {Container} from '@roots/container'
import type Webpack from 'webpack'
import WebpackHotMiddleware from 'webpack-hot-middleware'

/**
 * Hot middleware options
 *
 * @public
 */
const options: (
  config: Container<Server.Configuration>,
) => WebpackHotMiddleware.MiddlewareOptions = config => ({
  log: false,
  path: `/__webpack_hmr`,
  heartbeat: 10 * 1000,
})

/**
 * Hot middleware factory
 *
 * @public
 */
export default function hot({
  config,
  compiler,
}: {
  this: Framework
  config: Container<Server.Configuration>
  compiler: Webpack.Compiler | Webpack.MultiCompiler
}) {
  this.log('hot middleware options', options)

  return WebpackHotMiddleware(compiler, options(config))
}
